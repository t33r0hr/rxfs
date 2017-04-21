import * as path from 'path'
import { Observable, Subscription, Observer, Scheduler } from 'rxjs'
import { exec } from './exec'

export * from './interfaces'
export * from './exec'
export * from './find'
export * from './fs'
export * from './from'

export const readdir = ( filepath:string ):Observable<string> => {
  return exec(`find . -type file`,{cwd: filepath}).map(value => path.join(filepath,value.stdout.toString('utf8')))
              .flatMap(value => Observable.of(value)).concat()
}
