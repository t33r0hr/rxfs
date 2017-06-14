"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const common_1 = require("./common");
const fs = require("fs");
const path = require("path");
const exists_1 = require("./exists");
const mkdirAsync = common_1._promisify(fs.mkdir);
exports.mkdir = (directory) => {
    const leftExists = exists_1.exists(path.dirname(directory));
    const rightExists = exists_1.exists(directory);
    return rx_1.Observable.zip(leftExists, rightExists).flatMap(([parentExists, dirExists]) => {
        if (!parentExists) {
            throw Error("No directory at " + path.dirname(directory));
        }
        if (dirExists) {
            return rx_1.Observable.of(directory);
        }
        return rx_1.Observable.fromPromise(mkdirAsync(directory)).map(() => directory);
    });
};
//# sourceMappingURL=mkdir.js.map