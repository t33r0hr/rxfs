import { Observable } from 'rxjs'
import * as fs from 'fs'
import { find } from 'rxshell'


export interface ReaddirOptions {
  encoding: string
  flag?: string
}

export const readdir = ( filepath:string ) => {
  return find(['-maxdepth','1'],filepath)
    .map ( data => data.replace('./','') )
    .filter( item => item !== '.')
}