"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const nodefs = require("fs");
const rxshell_1 = require("rxshell");
const rxjs_1 = require("rxjs");
const randomInt = (max = 100, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const randomChr = () => String.fromCharCode(randomInt('z'.charCodeAt(0), 'a'.charCodeAt(0)));
const randomWord = (length = randomInt(30, 2)) => {
    const chrs = '.'.repeat(length).split('.').slice(1).map(() => randomChr());
    return chrs.join('');
};
const randomName = () => `kio_tmp_${randomWord(9)}.tmp`;
const addExitHandler = (handler) => {
    //do something when app is closing
    process.on('exit', handler);
    process.on('SIGINT', handler);
    process.on('uncaughtException', handler);
};
const registerAutoDeletion = (filename) => {
    addExitHandler(() => {
        nodefs.unlinkSync(filename);
    });
};
const writeFile = (filepath, contents, encoding) => {
    const writer = nodefs.createWriteStream(filepath, encoding);
    return rxshell_1.writeToStream(contents, writer, encoding);
};
exports.file = (content, persist = false) => {
    const tmpFilename = path.join(process.env.TMPDIR, randomName());
    const sub = writeFile(tmpFilename, rxjs_1.Observable.of(new Buffer(content || '')), 'utf8');
    if (persist !== true) {
        registerAutoDeletion(tmpFilename);
    }
    return rxjs_1.Observable.of(tmpFilename);
};
//# sourceMappingURL=tmp.js.map