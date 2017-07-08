"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const exec_1 = require("./exec");
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