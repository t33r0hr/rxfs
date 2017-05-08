"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const stat_1 = require("./stat");
var StatTypes;
(function (StatTypes) {
    StatTypes[StatTypes["Directory"] = 0] = "Directory";
    StatTypes[StatTypes["FIFO"] = 1] = "FIFO";
    StatTypes[StatTypes["File"] = 2] = "File";
    StatTypes[StatTypes["Socket"] = 3] = "Socket";
    StatTypes[StatTypes["BlockDevice"] = 4] = "BlockDevice";
    StatTypes[StatTypes["CharacterDevice"] = 5] = "CharacterDevice";
    StatTypes[StatTypes["SymbolicLink"] = 6] = "SymbolicLink";
})(StatTypes = exports.StatTypes || (exports.StatTypes = {}));
exports.existsSync = (filepath) => !!stat_1.statSync(filepath);
exports.exists = (filepath) => stat_1.stat(filepath)
    .map(stats => !!stats)
    .catch(error => {
    return rxjs_1.Observable.of(false);
});
const testFSType = (statType) => (filepath) => stat_1.stat(filepath)
    .map(stats => !!stats)
    .catch(error => {
    return rxjs_1.Observable.of(false);
});
exports.isType = (statType, filepath) => testFSType(statType)(filepath);
exports.isDirectory = testFSType(StatTypes.Directory);
exports.isFIFO = testFSType(StatTypes.FIFO);
exports.isFile = testFSType(StatTypes.File);
exports.isSocket = testFSType(StatTypes.Socket);
exports.isBlockDevice = testFSType(StatTypes.BlockDevice);
exports.isCharacterDevice = testFSType(StatTypes.CharacterDevice);
exports.isSymbolicLink = testFSType(StatTypes.SymbolicLink);
//# sourceMappingURL=exists.js.map