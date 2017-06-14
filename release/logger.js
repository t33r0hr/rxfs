"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stack = () => {
    const err = Error('none');
    return err.stack.split('\n').slice(4).filter(row => /rx/.test(row) === false);
};
exports.formatValue = (value) => {
    if ('string' === typeof value)
        return value;
    if ('boolean' === typeof value)
        return value ? 'true' : 'false';
    if ('number' === typeof value)
        return `${value}`;
    return JSON.stringify(value, null, '  ');
};
exports.logMap = (label, ...labelArgs) => {
    return (value, idx) => {
        const t = typeof value;
        const valueArgs = (typeof idx !== 'undefined') ? [`${idx}`, `${t}`] : [`${t}`];
        const prefix = idx !== undefined ? ':%s\t(%s)\t' : '(%s)\t';
        const format = label + prefix;
        console.log(label, ...labelArgs, '\x1b[2m' + exports.stack()[0] + '\x1b[0m');
        console.log(prefix, ...valueArgs);
        console.log('---\n', exports.formatValue(value), '\n---');
        return value;
    };
};
exports.logObservable = (observable, name) => {
    const head = () => {
        console.log(`Observable`, name ? `(${name})` : '');
    };
    const sub = observable.subscribe((value) => {
        head();
        console.log('value', value);
    }, (error) => {
        head();
        console.error(error);
    }, () => {
        head();
        console.log('done');
    });
};
//# sourceMappingURL=logger.js.map