import { Observable } from 'rxjs'
import { _promisify } from './common'
import { stat as fsStat, Stats, statSync as fsStatSync} from 'fs'
import * as debug from './debug'

const statAsync = _promisify(fsStat)

export { Stats }
export const stat = ( filepath:string ) => Observable.of(filepath)
  .flatMap( filepath => statAsync(filepath) ).take(1)
  .catch ( error => {
    debug.log('stat() - failed to get stats for file at "%s"', filepath, error )
    return Observable.throw(new Error(`Failed to get stats for "${filepath}". ${error}`))
  } )
  .map ( stats => {
    debug.log('stats for "%s"', filepath, stats)
    return stats
  } )

export const statSync = ( filepath:string ):Stats => {
  debug.log('statSync() - stats for file at "%s"', filepath )
  let didFail = true
  let fileStat
  try{
    fileStat = fsStatSync ( filepath )
    didFail = false
  }catch(e){}
  return fileStat
}