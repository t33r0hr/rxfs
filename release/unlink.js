"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }).map((exitCode) => {
        return (exitCode === 0);
    });
};
//# sourceMappingURL=unlink.js.map