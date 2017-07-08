import { Observable, Subscription } from 'rxjs'
import { _promisify } from './common'
import * as fs from 'fs'
import * as path from 'path'
import { writeToStream } from 'rxshell'
import * as logger from './logger'
import { exists } from './exists'
import { exec } from './exec'


export const link = ( source:string, target:string ):Observable<boolean> => {
  return exec({
    command: {
      commandName: 'ln',
      args: ['-s', source, target]
    }
  }).map ( exitCode => exitCode === 0 )
}
