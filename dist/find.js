"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const path = require("path");
const fs_1 = require("./fs");
const exec_1 = require("./exec");
exports.find = (filepath) => {
    if (!fs_1.existsSync(filepath))
        return rxjs_1.Observable.empty();
    return exec_1.exec(`find .`, { cwd: filepath }).map(value => path.join(filepath, value.stdout.toString('utf8')))
        .flatMap(value => rxjs_1.Observable.of(value)).concat();
};
exports.findFiles = (filepath, pattern = /.*/) => {
    if (!fs_1.existsSync(filepath)) {
        return rxjs_1.Observable.empty();
    }
    return exec_1.exec(`find . -type file`, { cwd: filepath })
        .map(value => path.join(filepath, value.stdout.toString('utf8')))
        .filter(value => !path.basename(value).startsWith('.'))
        .filter(filename => pattern.test(filename))
        .flatMap(value => rxjs_1.Observable.of(value)).concat();
};
//# sourceMappingURL=find.js.map