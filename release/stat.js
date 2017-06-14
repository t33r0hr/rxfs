"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const common_1 = require("./common");
const fs_1 = require("fs");
const statAsync = common_1._promisify(fs_1.stat);
exports.stat = (filepath) => rx_1.Observable.fromPromise(statAsync(filepath));
exports.statSync = (filepath) => {
    let didFail = true;
    let fileStat;
    try {
        fileStat = fs_1.statSync(filepath);
        didFail = false;
    }
    catch (e) { }
    return fileStat;
};
//# sourceMappingURL=stat.js.map