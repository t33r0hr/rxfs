"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prefix = 'rxfs';
exports.log = (format, ...args) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
        console.log(`\x1b[33m[%s]\x1b[0m ${format}`, prefix, ...args);
    }
};
//# sourceMappingURL=debug.js.map