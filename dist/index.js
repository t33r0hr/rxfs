"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const rxjs_1 = require("rxjs");
const exec_1 = require("./exec");
__export(require("./exec"));
__export(require("./find"));
__export(require("./diff"));
__export(require("./readFile"));
__export(require("./writeFile"));
__export(require("./readdir"));
__export(require("./mkdir"));
__export(require("./stat"));
const tmp = require("./tmp");
exports.tmp = tmp;
__export(require("./exists"));
__export(require("./from"));
function debuff(value) {
    if ('string' === typeof value)
        return value;
    return value.toString('utf8');
}
exports.readdir = (filepath) => {
    return exec_1.exec(`find . -type file`, { cwd: filepath }).map(value => path.join(filepath, debuff(value.stdout)))
        .flatMap(value => rxjs_1.Observable.of(value)).concat();
};
//# sourceMappingURL=index.js.map