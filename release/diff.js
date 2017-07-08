"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const exists_1 = require("./exists");
const spawn_1 = require("./spawn");
const tmp_1 = require("./tmp");
exports.diff = (opts, ...targets) => {
    if ('string' === typeof opts) {
        return exports.diff({}, opts, ...targets);
    }
    const parser = diffParser();
    const mapTarget = (targetFilepath) => {
        return exists_1.exists(targetFilepath).switchMap(ex => (ex ? rxjs_1.Observable.of(targetFilepath) : tmp_1.file(targetFilepath)));
    };
    return rxjs_1.Observable
        .from(targets)
        .flatMap(mapTarget)
        .toArray()
        .concatMap(filenames => {
        return spawn_1.spawn('diff', filenames);
    })
        .flatMap((proc) => {
        return proc.stdout.map(row => parser.parse(row.toString('utf8'))).ignoreElements().concat(proc.close);
    })
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