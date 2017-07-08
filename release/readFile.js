"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const fs = require("fs");
const rxshell_1 = require("rxshell");
const debug = require("./debug");
function readFile(filepath, encoding) {
    let options;
    let renderOutput = (data) => data;
    if (encoding && 'string' === typeof encoding) {
        options = {
            encoding
        };
        renderOutput = (data) => data.toString(encoding);
    }
    else if ('object' === typeof encoding) {
        options = encoding;
    }
    debug.log('readFile() - create read stream for "%s"', filepath);
    let stream;
    let error;
    try {
        stream = fs.createReadStream(filepath, options);
    }
    catch (e) {
        error = e;
    }
    if (error) {
        return rxjs_1.Observable.throw(new Error(`Failed to create read stream with Error: ${error}`));
    }
    return rxshell_1.fromReadable(stream).map(data => renderOutput(data));
}
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map