"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const readFile_1 = require("../readFile");
const extglob = require("extglob");
function parseRegExpr(source) {
    const exp = extglob(source);
    return new RegExp(exp);
}
exports.parseRegExpr = parseRegExpr;
function fromFile(filepath, include = false) {
    return readFile_1.readFile(filepath, 'utf8').toArray().concatMap(rows => rxjs_1.Observable.of(...rows.join('\n').split('\n')))
        .filter(row => row && row.substr(0, 1) !== '#' && row.substr(0, 1) !== '.')
        .map(row => parseRegExpr(row))
        .filter(row => !!row)
        .toArray()
        .map(rxs => {
        return (other, idx) => {
            const rx = rxs.find(reg => reg.test(other) === true);
            if (rx) {
                console.log('rx matched', rx, other);
            }
            return (rx === undefined) === !include;
        };
    });
}
exports.fromFile = fromFile;
//# sourceMappingURL=fromFile.js.map