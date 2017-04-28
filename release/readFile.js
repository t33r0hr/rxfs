"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxshell_1 = require("rxshell");
exports.readFile = (filepath, encoding) => {
    let options = encoding;
    if (encoding && 'string' === typeof encoding) {
        options = {
            encoding
        };
    }
    return rxshell_1.fromReadable(fs.createReadStream(filepath, options));
};
//# sourceMappingURL=readFile.js.map