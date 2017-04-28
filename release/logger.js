"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMap = (label) => {
    return (value, idx) => {
        const t = typeof value;
        const args = idx !== undefined ? [idx, t, value] : [t, value];
        const prefix = idx !== undefined ? ':%s\t(%s)\t' : '(%s)\t';
        console.log(label + prefix, ...args);
        return value;
    };
};
//# sourceMappingURL=logger.js.map