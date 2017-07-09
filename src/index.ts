import * as path from 'path'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/mergeMap'
import { spawn , RxProcess } from './spawn'
import * as filter from './filter'

export * from './interfaces'
export * from './exec'
export * from './spawn'
export * from './find'
export * from './touch'
export * from './diff'
export * from './readFile'
export * from './writeFile'
export * from './readdir'
export * from './link'
export * from './mkdir'
export * from './stat'
import * as tmp from './tmp'
export { tmp, filter }
export * from './exists'
export * from './unlink'
export * from './from'

function debuff(value:string|Buffer):string {
  if ( 'string' === typeof value ) 
    return value
  return value.toString('utf8')
}

export const readdir = ( filepath:string ):Observable<string> => {
  return spawn('find',['.','-type','file'],filepath).mergeMap((proc:RxProcess) => proc.close).concatMap(result => Observable.from(result.stdout.map(b => b.toString('utf8'))))
}
