"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("rx");
function zip(observableA, observableB) {
    return Rx.Observable.zip(observableA, observableB, (valueA, valueB) => ([valueA, valueB]));
}
exports.zip = zip;
//# sourceMappingURL=rx.zip.js.map