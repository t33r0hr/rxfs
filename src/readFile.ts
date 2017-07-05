import { Observable } from 'rxjs'
import * as fs from 'fs'
import { fromReadable } from 'rxshell'
import * as debug from './debug'

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
  debug.log('readFile() - create read stream for "%s"', filepath )
  
  let stream:fs.ReadStream
  let error

  try{
    stream = fs.createReadStream(filepath,options)
  }catch(e){
    error = e
  }
  if ( error )
  {
    return Observable.throw(new Error(`Failed to create read stream with Error: ${error}`))
  }
  return fromReadable(stream)
}