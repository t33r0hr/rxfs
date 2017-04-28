import { Observable } from 'rxjs'
import { _promisify } from './common'
import { stat as fsStat, Stats} from 'fs'

const statAsync = _promisify(fsStat)

export { Stats }
export const stat = ( filepath:string ) => Observable.fromPromise(statAsync(filepath))
