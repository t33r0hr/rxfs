"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxshell = require("rxshell");
const rxjs_1 = require("rxjs");
exports.find = (args) => {
    if ('string' === typeof args) {
        return exports.find({
            cwd: args
        });
    }
    const command = 'find .' + (args.types !== undefined ? args.types.map(t => ' -type ' + t).join('') : '');
    console.log('find at ', args.cwd);
    return rxshell.exec(command, { cwd: args.cwd }).flatMap(stream => {
        if (stream.stderr) {
            return Promise.reject(Error(stream.stderr.toString('utf8')));
        }
        return rxjs_1.Observable.of(stream.stdout.toString('utf8'));
    });
};
//# sourceMappingURL=find.js.map