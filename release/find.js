"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxshell = require("rxshell");
const path = require("path");
exports.find = (args) => {
    if ('string' === typeof args) {
        return exports.find({
            cwd: args,
            types: ['file']
        });
    }
    const commandArgs = [];
    (args.types || []).forEach(type => {
        commandArgs.push('-type');
        commandArgs.push(type);
    });
    console.log('find at ', args.cwd);
    return rxshell.find(commandArgs, args.cwd)
        .map(row => {
        return path.join(args.cwd, `${row}`);
    });
};
//# sourceMappingURL=find.js.map