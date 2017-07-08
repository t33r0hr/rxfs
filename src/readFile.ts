import { Observable } from 'rxjs'
import * as fs from 'fs'
import { fromReadable } from 'rxshell'
import * as debug from './debug'

export interface ReadFileOptions {
  encoding: string
  flag?: string
}

export function readFile ( filepath:string, encoding:'utf8' ):Observable<string> 
export function readFile ( filepath:string, encoding:ReadFileOptions ):Observable<Buffer> 
export function readFile <T extends Buffer|string>( filepath:string, encoding?:string|ReadFileOptions ):Observable<T> 
{
  let options:ReadFileOptions
  let renderOutput = (data:any):T => data
  if ( encoding && 'string' === typeof encoding )
  {
    options = {
      encoding
    }
    renderOutput = (data:any) => data.toString(encoding)
  }
  else if ( 'object' === typeof encoding ) {
    options = encoding
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
  return fromReadable(stream).map( data => renderOutput(data) )
}