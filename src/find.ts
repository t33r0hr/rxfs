import * as rxshell from 'rxshell'
import { Observable } from 'rxjs'
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
      cwd: args
    } )
  }

  const command = 'find .' + (args.types !== undefined ? args.types.map ( t => ' -type '+t ).join('') : '')
  console.log('find at ', args.cwd)
  return rxshell.exec(
    command,
    {cwd: args.cwd}
  ).flatMap ( stream => {
    if ( stream.stderr )
    {
      return Promise.reject(Error(stream.stderr.toString('utf8')))
    }
    return Observable.of(stream.stdout.toString('utf8'))
  } )
}