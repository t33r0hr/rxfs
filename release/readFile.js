"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxshell_1 = require("rxshell");
exports.readFile = (filepath, encoding) => {
    let options = encoding;
    if (encoding && 'string' === typeof encoding) {
        options = {
            encoding
        };
    }
    return rxshell_1.exec({
        command: `cat "${filepath}"`,
        cwd: process.cwd()
    }, true);
};
//# sourceMappingURL=readFile.js.map