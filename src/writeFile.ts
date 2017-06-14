import { Observable, Subscription } from 'rx'
import * as fs from 'fs'
import { writeToStream } from 'rx-node'

import * as logger from './logger'


export interface WriteFileOptions {
  encoding: string
  flag?: string
}

export const writeFile = ( filepath:string, content:Observable<Buffer>, encoding?:string|WriteFileOptions ) => {
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
  return writeToStream(content,fs.createWriteStream(filepath,options),options.encoding)
}

export const mapWriteFile = ( filepath:string, content:Observable<Buffer>, encoding?:string|WriteFileOptions ):Observable<Buffer> => {  
  const deferred = writeFile(filepath,content,encoding)
  return content
}