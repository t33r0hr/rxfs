"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._promisify = (func) => {
    return (arg1, arg2) => new Promise((resolve, reject) => {
        if (arg2) {
            func(arg1, arg2, (error, result) => {
                error ? reject(error) : resolve(result);
            });
        }
        else if (arg1) {
            func(arg1, (error, result) => {
                error ? reject(error) : resolve(result);
            });
        }
        else {
            func((error, result) => {
                error ? reject(error) : resolve(result);
            });
        }
    });
};
exports._observalize = (target) => {
    return exports._promisify(target);
};
//# sourceMappingURL=common.js.map