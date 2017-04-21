"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const path = require("path");
const child_process_1 = require("child_process");
const from_1 = require("./from");
const execObserve = (command, opts) => {
    const cwd = (opts || { cwd: process.cwd() }).cwd;
    const commandLog = `command: "${command}"`;
    opts = opts || {
        cwd
    };
    //console.log(commandLog)
    const cp = child_process_1.exec(command, opts, (error, out) => {
        //console.log('[%s] %s - end', new Date() , commandLog , '\n---\nerror\n', error )
    });
    const obs = from_1.fromReadable(cp.stdout).map(stdout => ({ stdout }));
    const obsErr = from_1.fromReadable(cp.stderr).map(stderr => ({ stderr }));
    return rxjs_1.Observable.merge(obs, obsErr);
};
exports.exec = execObserve;
exports.evalJS = (filepath, opts) => {
    const data = require(filepath);
    return rxjs_1.Observable.of(data);
};
exports.evalTS = (filepath, opts) => {
    const execRoot = opts && opts.cwd ? opts.cwd : process.cwd();
    const relFilepath = path.relative(execRoot, filepath);
    return execObserve(`ts-node -e 'require("./${relFilepath}")'`, { cwd: execRoot });
};
//# sourceMappingURL=exec.js.map