import { Observable } from 'rxjs'
import { _promisify, Callable } from './common'
import * as fs from 'fs'
import { exec } from './exec'



export interface UnlinkOptions {
  recursive?: boolean
  force?: boolean
}

function flagsFromOptions ( options:UnlinkOptions={} ) {
  const flags:string[] = []
  if ( options.recursive )
    flags.push('r')
  if ( options.force )
    flags.push('f')
  return flags
}

export const unlink = ( filepath:string, options:UnlinkOptions={} ):Observable<boolean> => {
  const args:string[] = [filepath]  
  const flags:string[] = flagsFromOptions(options)
  if ( flags.length > 0 )
    args.unshift('-'+flags.join(''))

  const promise = exec({
    command: {
      commandName: 'rm',
      args
    }
  }).toArray().toPromise().then ( (results):PromiseLike<any>|boolean => {
    const errors = results.filter ( r => r.stderr ).map ( r => `${r.stderr}` )
    if ( errors.length === 0 )
      return true
    return Promise.reject(`Failed to delete ${filepath}. ${errors.join('\n')}`)
  } )
  .catch ( error => {
    return Promise.reject(`Failed to delete ${filepath}. ${error}`)
  } )

  return Observable.fromPromise(promise)
}
