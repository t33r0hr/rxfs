"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const spawn_1 = require("./spawn");
__export(require("./exec"));
__export(require("./spawn"));
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
__export(require("./unlink"));
__export(require("./from"));
function debuff(value) {
    if ('string' === typeof value)
        return value;
    return value.toString('utf8');
}
exports.readdir = (filepath) => {
    return spawn_1.spawn('find', ['.', '-type', 'file'], filepath).flatMap((proc) => proc.close).concatMap(result => rxjs_1.Observable.from(result.stdout.map(b => b.toString('utf8'))));
};
//# sourceMappingURL=index.js.map