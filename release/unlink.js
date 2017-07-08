"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const exec_1 = require("./exec");
const exists_1 = require("./exists");
const debug = require("./debug");
function flagsFromOptions(options = {}) {
    const flags = [];
    if (options.recursive)
        flags.push('r');
    if (options.force)
        flags.push('f');
    return flags;
}
exports.unlink = (filepath, options = {}) => {
    const args = [filepath];
    const flags = flagsFromOptions(options);
    if (flags.length > 0)
        args.unshift('-' + flags.join(''));
    debug.log('unlink "%s" - params:', filepath, flags);
    return exists_1.exists(filepath).switchMap(ex => {
        return !ex ? rxjs_1.Observable.of(true) : exec_1.exec({
            command: {
                commandName: 'rm',
                args
            }
        }).map((exitCode) => {
            return (exitCode === 0);
        });
    });
};
//# sourceMappingURL=unlink.js.map