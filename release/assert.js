"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const ceylon_1 = require("ceylon");
exports.assertObservables = (source, target, asserter) => {
    return rxjs_1.Observable.zip(source, target).flatMap(([left, right], idx) => {
        //console.log('left,right %s',idx,left,right)
        asserter(left, right, idx);
        return rxjs_1.Observable.of(true);
    });
};
exports.compareItems = (item, other, idx) => {
    //console.log('items at %s\n', idx, item, '\n', other, '\n---' )
    ceylon_1.default(item).toEqual(other, `items differ at ${idx}. expected "${item}" to be "${other}"`);
};
exports.expectObs = (source) => {
    return {
        toMatch: (other, asserter = exports.compareItems) => exports.assertObservables(source, other, asserter)
    };
};
//# sourceMappingURL=assert.js.map