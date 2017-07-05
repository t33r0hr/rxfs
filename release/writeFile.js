"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const fs = require("fs");
const rxshell_1 = require("rxshell");
const debug = require("./debug");
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
    debug.log('writeFile() - create write stream for "%s"', filepath);
    let stream;
    let error;
    try {
        stream = fs.createWriteStream(filepath, options);
    }
    catch (e) {
        error = e;
    }
    if (error) {
        return rxjs_1.Observable.throw(new Error(`Failed to create write stream with Error: ${error}`));
    }
    return rxshell_1.writeToStream(content, stream, options.encoding);
};
exports.mapWriteFile = (filepath, content, encoding) => {
    const deferred = exports.writeFile(filepath, content, encoding);
    return content;
};
//# sourceMappingURL=writeFile.js.map