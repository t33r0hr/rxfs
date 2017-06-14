import { Observable, Subscription } from 'rx'
import { _promisify } from './common'
import * as fs from 'fs'
import * as path from 'path'
import { writeToStream } from 'rx-node'
import * as logger from './logger'
import { exists } from './exists'


const mkdirAsync = _promisify(fs.mkdir)

export const mkdir = ( directory:string ):Observable<string> => {
  return Observable.zip(
      exists(path.dirname(directory)),
      exists(directory)
    ).flatMap ( ([parentExists,dirExists]) => {
      if ( !parentExists )
        return Observable.throw("No directory at " + path.dirname(directory) )

      if ( dirExists )
      {
        return Observable.of(directory)
      }
      return Observable.fromPromise(mkdirAsync(directory)).map ( () => directory )
    } )
}
