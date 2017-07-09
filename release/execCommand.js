"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn_1 = require("./spawn");
function command(commandName, stdout) {
    return (...args) => {
        const processSource = spawn_1.spawnProcess(commandName, args);
        //debug.log('command process', commandName, args)
        return processSource.flatMap((processWrapper) => {
            //debug.log('process wrapper', processWrapper)
            return processWrapper.close.take(1);
            /*const bufferedErrors = processWrapper.stderr.buffer(processWrapper.close)
            return Observable.zip(bufferedErrors,processWrapper.close).map ( ([errors,result]) => {
              debug.log('errors',errors)
              debug.log('result',result)
              return result
            } )*/
        });
    };
}
exports.command = command;
//# sourceMappingURL=execCommand.js.map