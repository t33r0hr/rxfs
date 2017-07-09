"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const spawn_1 = require("./spawn");
const execCommand_1 = require("./execCommand");
const stat_1 = require("./stat");
const debug = require("./debug");
exports.defaultFlags = {
    c: false,
    m: true,
    a: true,
    f: false,
    h: true
};
function parseFlags(options) {
    if (!options)
        return undefined;
    const flagArgs = Object.keys(options || {}).filter(k => options[k]);
    if (flagArgs.length > 0)
        return `-${flagArgs.join('')}`;
}
exports.touch_command = execCommand_1.command('touch');
function touch(filepath, flags) {
    const args = [parseFlags(flags), filepath].filter(v => !!v);
    const touchCommand = `touch ${args.join(' ')}`;
    debug.log('%s', touchCommand);
    return exports.touch_command(...args).concatMap(result => {
        //debug.log('touch_command result', result)
        return stat_1.stat(filepath);
    });
}
exports.touch = touch;
function _touch(filepath, flags) {
    const flagArgs = Object.keys(flags || {}).filter(k => flags[k]);
    const args = flagArgs.length ? [('-' + flagArgs.join(''))] : [];
    args.push(filepath);
    const touchCommand = `touch ${args.join(' ')}`;
    //debug.log('$ %s',touchCommand)
    return spawn_1.spawnProcess('touch', args).take(1)
        .concatMap((proc) => {
        return proc.close;
    })
        .flatMap(result => {
        if (result.exitCode !== 0) {
            const message = result.stderr;
            debug.log('error', message);
            return Observable_1.Observable.throw(new Error(`Failed to touch ${filepath}. ${message}`));
        }
        return Observable_1.Observable.of(filepath);
    })
        .flatMap(filepath => {
        //debug.log('stats for: "%s"',filepath)
        return Observable_1.Observable.concat(stat_1.stat(filepath), Observable_1.Observable.empty());
    });
}
exports._touch = _touch;
//# sourceMappingURL=touch.js.map