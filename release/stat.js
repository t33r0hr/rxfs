"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const common_1 = require("./common");
const fs_1 = require("fs");
const debug = require("./debug");
const statAsync = common_1._promisify(fs_1.stat);
exports.stat = (filepath) => rxjs_1.Observable.of(filepath)
    .flatMap(filepath => statAsync(filepath)).take(1)
    .catch(error => {
    debug.log('stat() - failed to get stats for file at "%s"', filepath, error);
    return rxjs_1.Observable.throw(new Error(`Failed to get stats for "${filepath}". ${error}`));
})
    .map(stats => {
    debug.log('stats for "%s"', filepath, stats);
    return stats;
});
exports.statSync = (filepath) => {
    debug.log('statSync() - stats for file at "%s"', filepath);
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