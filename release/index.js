"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./exec"));
__export(require("./find"));
__export(require("./diff"));
__export(require("./readFile"));
__export(require("./writeFile"));
__export(require("./readdir"));
__export(require("./mkdir"));
__export(require("./stat"));
const tmp = require("./tmp");
exports.tmp = tmp;
__export(require("./exists"));
__export(require("./from"));
/*export const readdir = ( filepath:string ):Observable<string> => {
  return exec(`find . -type file`,filepath).map(value => path.join(filepath,value.stdout.toString('utf8')))
              .flatMap(value => Observable.of(value)).concat()
}
*/ 
//# sourceMappingURL=index.js.map