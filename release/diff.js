"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const _1 = require("./");
const rxshell_1 = require("rxshell");
const tmp_1 = require("./tmp");
exports.diff = (opts, ...targets) => {
    if ('string' === typeof opts) {
        return exports.diff({}, opts, ...targets);
    }
    const parser = diffParser();
    return rx_1.Observable
        .from(targets)
        .flatMap(target => {
        return _1.exists(target).flatMap(doesExist => {
            if (doesExist)
                return rx_1.Observable.of(target);
            return tmp_1.file(target);
        });
    })
        .toArray()
        .map(filenames => {
        return {
            command: {
                commandName: 'diff',
                args: filenames
            }
        };
    })
        .concatMap(command => rxshell_1.exec(command))
        .flatMap((out) => {
        if (out.stderr) {
            return rx_1.Observable.throw(out.stderr.toString());
        }
        /*if ( !out.stdout )
        {
          console.warn('no data on stdout', out)
        }*/
        return rx_1.Observable.of(parser.parse(out.stdout ? out.stdout.toString() : ''));
    })
        .toArray()
        .map(result => {
        return parser.result();
    });
};
const rx_index = /^(.+)c(.+)$/gm;
const rx_leftRow = /^\>\ (.+)$/gm;
const rx_rightRow = /^\<\ (.+)$/gm;
const diffParser = () => {
    const diffs = [];
    let diffIndex = 0;
    let currentDiff = null;
    return {
        parse: (row) => {
            if (rx_index.test(row)) {
                currentDiff = {
                    index: row.match(rx_index)[0],
                    leftRows: [],
                    rightRows: [],
                };
                diffs.push(currentDiff);
            }
            if (currentDiff) {
                if (rx_leftRow.test(row)) {
                    currentDiff.leftRows.push(row.substr(2));
                }
                else if (rx_rightRow.test(row)) {
                    currentDiff.rightRows.push(row.substr(2));
                }
            }
            return row;
        },
        result: () => {
            return diffs.slice();
        }
    };
};
exports.parseDiff = (source) => {
    const rx_index = /^(.+)c(.+)$/gm;
    const rx_leftRow = /^\>\ (.+)$/gm;
    const matches = [];
    do {
        const match = rx_index.exec(source);
        if (!match)
            break;
        const [full, leftIndex, rightIndex] = match;
        const leftRowMatches = source.slice(match.index + match.length).match(rx_leftRow);
        matches.push({ full, leftIndex, rightIndex, leftRowMatches });
    } while (true);
    return matches;
};
//# sourceMappingURL=diff.js.map