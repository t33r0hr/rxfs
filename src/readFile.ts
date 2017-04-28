import { Observable } from 'rxjs'
import * as fs from 'fs'
import { fromReadable } from 'rxshell'


export interface ReadFileOptions {
  encoding: string
  flag?: string
}

export const readFile = <T>( filepath:string, encoding?:string|ReadFileOptions ):Observable<T> => {
  let options = encoding
  if ( encoding && 'string' === typeof encoding )
  {
    options = {
      encoding
    }
  }
  return fromReadable(fs.createReadStream(filepath,options))
}