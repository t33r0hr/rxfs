"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const ceylon_1 = require("ceylon");
exports.assertObservables = (source, target, asserter) => {
    let idx = 0;
    return rx_1.Observable.zip(source, target, (left, right) => ([left, right]))
        .flatMap(([left, right]) => {
        //console.log('left,right %s',idx,left,right)
        asserter(left, right, idx++);
        return rx_1.Observable.of(true);
    });
};
exports.isObservable = (other) => {
    return rx_1.Observable.prototype.isPrototypeOf(other);
};
exports.assertObservable = (other) => {
    ceylon_1.default(exports.isObservable(other)).toEqual(true, 'Should be an observable, but is a ' + other.constructor.name);
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