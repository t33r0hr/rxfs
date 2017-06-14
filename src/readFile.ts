import { Observable } from 'rx'
import * as fs from 'fs'
import { exec, StreamData } from 'rxshell'


export interface ReadFileOptions {
  encoding: string
  flag?: string
}

export const readFile = ( filepath:string, encoding?:string|ReadFileOptions ) => {
  let options = encoding
  if ( encoding && 'string' === typeof encoding )
  {
    options = {
      encoding
    }
  }
  return exec({
    command: `cat ${filepath}`,
    cwd: process.cwd()
  },true).map ( d => d.stdout )
}