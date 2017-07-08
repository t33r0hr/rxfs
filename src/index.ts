import * as path from 'path'
import { Observable, Subscription, Observer, Scheduler } from 'rxjs'
import { spawn , RxProcess } from './spawn'

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
  return spawn('find',['.','-type','file'],filepath).flatMap((proc:RxProcess) => proc.close).concatMap(result => Observable.from(result.stdout.map(b => b.toString('utf8'))))
}
