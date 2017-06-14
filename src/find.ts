import * as rxshell from 'rxshell'
import { Observable } from 'rx'
import * as path from 'path'
export type FileType = 'file'
export type DirType = 'dir'

export type FindTypes = FileType|DirType

export interface FindOptions {
  types?:FindTypes[]
  cwd:string
}

export const find = ( args:FindOptions|string ):Observable<string> => {
  if ( 'string' === typeof args )
  {
    return find ( {
      cwd: args,
      types: ['file']
    } )
  }

  const commandArgs:string[] = [];
  (args.types||[]).forEach ( type => {
    commandArgs.push('-type')
    commandArgs.push(type)
  } )
  console.log('find at ', args.cwd)
  return rxshell.find(commandArgs,args.cwd)
  .map ( row => {
    return path.join(args.cwd,`${row}`)
  } )
}