import * as path from 'path'
import { Observable, Subscription, Observer, Scheduler } from 'rxjs'
import { exec } from './exec'

export * from './interfaces'
export * from './exec'
export * from './find'
export * from './diff'
export * from './readFile'
export * from './writeFile'
export * from './readdir'
export * from './mkdir'
export * from './stat'
import * as tmp from './tmp'
export { tmp }
export * from './exists'
export * from './unlink'
export * from './from'

function debuff(value:string|Buffer):string {
  if ( 'string' === typeof value ) 
    return value
  return value.toString('utf8')
}

export const readdir = ( filepath:string ):Observable<string> => {
  return exec(`find . -type file`,{cwd: filepath}).map(value => path.join(filepath,debuff(value.stdout)))
              .flatMap(value => Observable.of(value)).concat()
}
