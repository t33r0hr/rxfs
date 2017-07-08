"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("./exec");
exports.link = (source, target) => {
    return exec_1.exec({
        command: {
            commandName: 'ln',
            args: ['-s', source, target]
        }
    }).map(exitCode => exitCode === 0);
};
//# sourceMappingURL=link.js.map