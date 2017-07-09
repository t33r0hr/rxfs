"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxshell_1 = require("rxshell");
const exec_1 = require("./exec");
function isStderrData(other) {
    return ('object' === typeof other
        &&
            'stderr' in other);
}
exports.isStderrData = isStderrData;
function isStdoutData(other) {
    return ('object' === typeof other
        &&
            'stdout' in other);
}
exports.isStdoutData = isStdoutData;
function spawnProcess(command, args, cwd = process.cwd()) {
    const childProcess = new rxshell_1.ChildProcess({
        command: {
            commandName: command,
            args
        },
        cwd
    });
    const processWrapper = childProcess.wrap();
    const stderrBuffer = [];
    const stderr = processWrapper.stderr.takeUntil(processWrapper.end).shareReplay();
    const closeSource = processWrapper.end.flatMap(exitCode => {
        if (exitCode !== 0) {
            return stderr.map(buf => buf.toString('utf8')).toArray().map(errors => {
                return {
                    exitCode,
                    errors
                };
            });
        }
        else {
            return rxjs_1.Observable.of({
                exitCode
            });
        }
    });
    return rxjs_1.Observable.of({
        stdout: processWrapper.stdout.takeUntil(processWrapper.end),
        stderr: processWrapper.stderr.takeUntil(processWrapper.end),
        close: closeSource
    });
}
exports.spawnProcess = spawnProcess;
function spawn(command, args, cwd = process.cwd()) {
    const stdoutSubject = new rxjs_1.Subject();
    const stderrSubject = new rxjs_1.Subject();
    const stdout = [];
    const stdoutSub = stdoutSubject.subscribe(data => {
        stdout.push(data);
    });
    const stderr = [];
    const stderrSub = stderrSubject.subscribe(data => {
        stderr.push(data);
    });
    const closeSource = exec_1.exec(command, args, {
        stdout: {
            write: stdoutSubject.next.bind(stdoutSubject)
        },
        stderr: {
            write: stderrSubject.next.bind(stderrSubject)
        }
    }).map((exitCode) => {
        return {
            exitCode,
            stdout: stdout,
            stderr: stderr
        };
    });
    const processOut = {
        stdout: stdoutSubject.asObservable().shareReplay().takeUntil(closeSource),
        stderr: stderrSubject.asObservable().shareReplay().takeUntil(closeSource),
        close: closeSource
    };
    return rxjs_1.Observable.of(processOut);
}
exports.spawn = spawn;
//# sourceMappingURL=spawn.js.map