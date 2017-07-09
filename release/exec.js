"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxshell = require("rxshell");
const debug = require("./debug");
function renderData(data) {
    if ('string' === typeof data)
        return data;
    return data.toString('utf8');
}
function isExecOptions(other) {
    return ('object' === typeof other) && (('args' in other)
        ||
            ('silent' in other)
        ||
            ('cwd' in other)
        ||
            ('bailOnStderr' in other)
        ||
            ('stdout' in other)
        ||
            ('stderr' in other));
}
exports.isExecOptions = isExecOptions;
function isChildProcessOptions(other) {
    return ('command' in other);
}
exports.isChildProcessOptions = isChildProcessOptions;
function commandError(command, errors) {
    const params = rxshell.parseCommand(command.command);
    return `Failed to execute "${params.commandName} ${params.args.join(' ')}" at "${command.cwd}":
---------
${errors.join('\n---------\n')}`;
}
function exec(command, args, options) {
    let commandParams;
    let childProcessOptions;
    if ('string' === typeof command) {
        const cmd = rxshell.parseCommand(command);
        return exec({ command: cmd }, args, options);
    }
    if (isChildProcessOptions(command)) {
        commandParams = rxshell.parseCommand(command.command);
    }
    childProcessOptions = {
        command: commandParams
    };
    if (args && isExecOptions(args)) {
        options = args;
    }
    else if (Array.isArray(args))
        commandParams.args.push(...args);
    if (isExecOptions(options)) {
        if ('cwd' in options) {
            childProcessOptions.cwd = options.cwd;
        }
        if ('args' in options) {
            commandParams.args.push(...options.args);
        }
    }
    else {
        options = {};
    }
    const bSilent = options.silent === true;
    const bBailOnStderr = options.bailOnStderr === true;
    const cwd = childProcessOptions.cwd || process.cwd();
    const stdout = options.stdout || process.stdout;
    const stderr = options.stderr || process.stderr;
    const errors = [];
    let errorBuffer;
    const ebufDrain = () => {
        if (errorBuffer)
            errors.push(errorBuffer);
        errorBuffer = undefined;
    };
    const ebufAdd = (row) => {
        if (!errorBuffer)
            errorBuffer = '';
        errorBuffer += renderData(row);
        if (!bSilent || options.stderr) {
            stderr.write(row);
        }
    };
    const shouldBail = () => {
        return (errors.length > 0 && bBailOnStderr);
    };
    const mapSource = (data, idx) => {
        if (shouldBail() && data['stdout'])
            return rxjs_1.Observable.throw(new Error(commandError(childProcessOptions, errors)));
        debug.log('mapSource %s', idx, Object.keys(data));
        if ('stderr' in data) {
            ebufAdd(data.stderr);
            debug.log('stderr data: "%s"', data.stderr);
            return rxjs_1.Observable.of('');
        }
        const out = renderData(data.stdout);
        if (!bSilent || options.stdout) {
            stdout.write(data.stdout);
        }
        debug.log('stdout data: "%s"', out);
        return rxjs_1.Observable.of(out);
    };
    const source = rxshell.exec(childProcessOptions, true).flatMap(mapSource);
    return source
        .toArray().map(rows => {
        return 0;
    });
}
exports.exec = exec;
//# sourceMappingURL=exec.js.map