"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const exec_1 = require("./exec");
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
    return exec_1.exec({
        command: {
            commandName: 'rm',
            args
        }
    }).concatMap((exitCode) => {
        if (exitCode === 0)
            return rxjs_1.Observable.of(true);
        return rxjs_1.Observable.throw(new Error(`ExitCode: ${exitCode}`));
    })
        .catch(error => {
        return Promise.reject(`Failed to delete ${filepath}. ${error}`);
    });
};
//# sourceMappingURL=unlink.js.map