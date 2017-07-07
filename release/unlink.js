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
    const promise = exec_1.exec({
        command: {
            commandName: 'rm',
            args
        }
    }).toArray().toPromise().then((results) => {
        const errors = results.filter(r => r.stderr).map(r => `${r.stderr}`);
        if (errors.length === 0)
            return true;
        return Promise.reject(`Failed to delete ${filepath}. ${errors.join('\n')}`);
    })
        .catch(error => {
        return Promise.reject(`Failed to delete ${filepath}. ${error}`);
    });
    return rxjs_1.Observable.fromPromise(promise);
};
//# sourceMappingURL=unlink.js.map