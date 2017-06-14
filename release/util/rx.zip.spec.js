"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const ceylon_1 = require("ceylon");
const rx_1 = require("rx");
const rx_zip_1 = require("./rx.zip");
const listA = ['a', 'b', 'c', 'd'];
const listB = [0, 1, 2, 3];
describe('testing zip operator', () => {
    let observableA;
    let observableB;
    it('zips', (done) => {
        rx_zip_1.zip(rx_1.Observable.from(listA), rx_1.Observable.from(listB)).subscribe(result => {
            ceylon_1.default(Array.isArray(result)).toBeTrue('result should be an Array, but is: ' + result.constructor.name);
        }, done, done);
    });
});
//# sourceMappingURL=rx.zip.spec.js.map