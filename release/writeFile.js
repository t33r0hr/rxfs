"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxshell_1 = require("rxshell");
exports.writeFile = (filepath, content, encoding) => {
    let options;
    if (encoding && 'string' === typeof encoding) {
        options = {
            encoding
        };
    }
    else if (encoding) {
        options = encoding || {};
    }
    else {
        options = {
            encoding: 'utf8'
        };
    }
    return rxshell_1.writeToStream(content, fs.createWriteStream(filepath, options), options.encoding);
};
exports.mapWriteFile = (filepath, content, encoding) => {
    const deferred = exports.writeFile(filepath, content, encoding);
    return content;
};
//# sourceMappingURL=writeFile.js.map