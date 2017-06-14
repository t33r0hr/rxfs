"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const common_1 = require("./common");
const fs = require("fs");
const path = require("path");
const exists_1 = require("./exists");
const mkdirAsync = common_1._promisify(fs.mkdir);
exports.mkdir = (directory) => {
    return rx_1.Observable.zip(exists_1.exists(path.dirname(directory)), exists_1.exists(directory)).flatMap(([parentExists, dirExists]) => {
        if (!parentExists)
            return rx_1.Observable.throw("No directory at " + path.dirname(directory));
        if (dirExists) {
            return rx_1.Observable.of(directory);
        }
        return rx_1.Observable.fromPromise(mkdirAsync(directory)).map(() => directory);
    });
};
//# sourceMappingURL=mkdir.js.map