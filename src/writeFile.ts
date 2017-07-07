import { Observable, Subscription } from 'rxjs'
import * as fs from 'fs'
import { writeToStream } from 'rxshell'

import * as logger from './logger'
import * as debug from './debug'


export interface WriteFileOptions {
  encoding: string
  flag?: string
}

export const writeFile = ( filepath:string, content:Observable<Buffer>, encoding?:string|WriteFileOptions ):Observable<boolean> => {
  let options
  if ( encoding && 'string' === typeof encoding )
  {
    options = {
      encoding
    }
  }
  else if ( encoding ) 
  {
    options = encoding || {}
  } else 
  {
    options = {
      encoding: 'utf8'
    }
  }
  debug.log('writeFile() - create write stream for "%s"', filepath )
  let stream:fs.WriteStream
  let error
  try{
    stream = fs.createWriteStream(filepath,options)
  }
  catch(e)
  {
    error = e
  }
  if ( error )
  {
    return Observable.throw(new Error(`Failed to create write stream with Error: ${error}`))
  }
  return writeToStream(content,stream,options.encoding)
}

export const mapWriteFile = ( filepath:string, content:Observable<Buffer>, encoding?:string|WriteFileOptions ):Observable<Buffer> => {  
  const deferred = writeFile(filepath,content,encoding)
  return content
}