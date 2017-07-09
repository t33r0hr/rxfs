"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/concatMap");
require("rxjs/add/operator/mergeMap");
const spawn_1 = require("./spawn");
const filter = require("./filter");
exports.filter = filter;
__export(require("./exec"));
__export(require("./spawn"));
__export(require("./find"));
__export(require("./touch"));
__export(require("./diff"));
__export(require("./readFile"));
__export(require("./writeFile"));
__export(require("./readdir"));
__export(require("./link"));
__export(require("./mkdir"));
__export(require("./stat"));
const tmp = require("./tmp");
exports.tmp = tmp;
__export(require("./exists"));
__export(require("./unlink"));
__export(require("./from"));
function debuff(value) {
    if ('string' === typeof value)
        return value;
    return value.toString('utf8');
}
exports.readdir = (filepath) => {
    return spawn_1.spawn('find', ['.', '-type', 'file'], filepath).mergeMap((proc) => proc.close).concatMap(result => Observable_1.Observable.from(result.stdout.map(b => b.toString('utf8'))));
};
//# sourceMappingURL=index.js.map