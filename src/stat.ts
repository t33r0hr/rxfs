import { Observable } from 'rxjs'
import { _promisify } from './common'
import { stat as fsStat, Stats, statSync as fsStatSync} from 'fs'

const statAsync = _promisify(fsStat)

export { Stats }
export const stat = ( filepath:string ) => Observable.fromPromise(statAsync(filepath))

export const statSync = ( filepath:string ):Stats => {
  let didFail = true
  let fileStat
  try{
    fileStat = fsStatSync ( filepath )
    didFail = false
  }catch(e){}
  return fileStat
}