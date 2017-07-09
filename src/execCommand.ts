import { Observable } from 'rxjs/Observable'
import { Flags } from './interfaces'
import { spawn, spawnProcess, RxProcess, RxProcessResult } from './spawn'
import { stat } from './stat'
import * as debug from './debug'
import * as fs from 'fs'


export function command ( commandName:string, stdout?:NodeJS.Socket ) {

  return ( ...args:any[] ):Observable<RxProcessResult> => {
    const processSource = spawnProcess(commandName,args)
    //debug.log('command process', commandName, args)
    return processSource.flatMap ( (processWrapper:RxProcess) => {
      //debug.log('process wrapper', processWrapper)
      return processWrapper.close.take(1)
      /*const bufferedErrors = processWrapper.stderr.buffer(processWrapper.close)
      return Observable.zip(bufferedErrors,processWrapper.close).map ( ([errors,result]) => {
        debug.log('errors',errors)
        debug.log('result',result)
        return result
      } )*/
    } )
  }

}