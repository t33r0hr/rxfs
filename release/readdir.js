"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxshell_1 = require("rxshell");
exports.readdir = (filepath) => {
    return rxshell_1.find(['-maxdepth', '1'], filepath)
        .map(data => data.stdout.toString().replace('./', ''))
        .filter(item => item !== '.');
};
//# sourceMappingURL=readdir.js.map