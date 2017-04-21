"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const from_1 = require("./from");
const shelljs_1 = require("shelljs");
const rxjs_1 = require("rxjs");
const promisify = (method) => (...args) => {
    return new Promise((resolve, reject) => {
        const result = method(...args, (error, ...results) => {
            if (error) {
                reject(error);
            }
            else {
                const [payload = result, ...resultArgs] = results;
                resolve(payload);
            }
        });
    });
};
//export * from 'fs'
exports.statSync = (filename) => {
    let stat;
    try {
        stat = fs.statSync(filename);
    }
    catch (e) { }
    return stat;
};
exports.existsSync = (filename) => {
    return !!exports.statSync(filename);
};
exports.async = {
    stat: promisify(fs.stat),
    mkdir: (filepath, p) => Promise.resolve(p ? shelljs_1.mkdir('-p', filepath) : shelljs_1.mkdir(filepath)),
    readFile: promisify(fs.readFile),
    unlink: promisify(fs.unlink),
    writeFile: promisify(fs.writeFile),
    readdir: promisify(fs.readdir)
};
exports.readfileFull = (filepath, full = false) => {
    if (full) {
        return rxjs_1.Observable.fromPromise(exports.async.readFile(filepath));
    }
    return from_1.fromReadable(fs.createReadStream(filepath, {
        encoding: 'utf8'
    })).map(buffer => buffer.toString()).concat();
};
exports.readFile = (filename, ...args) => {
    return rxjs_1.Observable.fromPromise(exports.async.readFile(filename, ...args));
};
exports.writeFile = (filename, content, ...args) => {
    return rxjs_1.Observable.fromPromise(exports.async.writeFile(filename, content, ...args)
        .then(() => filename)
        .catch(error => {
        console.error(`writeFile(${filename}) failed with error: ${error}`);
    }));
};
exports.readfile = (filepath, full = false) => {
    if (full) {
        return exports.readFile(filepath);
    }
    return from_1.fromReadable(fs.createReadStream(filepath, {
        encoding: 'utf8'
    })).map(buffer => buffer.toString()).concat();
};
exports.readDir = (filename) => {
    return rxjs_1.Observable.fromPromise(exports.async.readdir(filename).catch(error => Promise.resolve([])));
};
exports.readstats = (filepath) => rxjs_1.Observable.fromPromise(exports.async.stat(filepath));
exports.unlink = (filepath) => rxjs_1.Observable.fromPromise(exports.async.unlink(filepath).then(() => true));
exports.mkdir = (filepath) => rxjs_1.Observable.fromPromise(exports.async.mkdir(filepath).then(() => filepath));
//# sourceMappingURL=fs.js.map