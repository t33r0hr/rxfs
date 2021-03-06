import { Observable } from 'rxjs'
import { _promisify } from './common'
import * as fs from 'fs'

import { stat, Stats, statSync } from './stat'

export enum StatTypes {
  Directory,
  FIFO,
  File,
  Socket,
  BlockDevice,
  CharacterDevice,
  SymbolicLink
}

export const existsSync = ( filepath:string ):boolean => !!statSync(filepath)

export const exists = ( filepath:string ):Observable<boolean> => stat(filepath)
.catch ( error => {
  return Observable.of(false)
})
.map ( stats => !!stats )


const testFSType = ( statType:StatTypes ) => (filepath:string ):Observable<boolean> => stat(filepath)
.catch ( error => {
  return Observable.of(false)
})
.map ( stats => !!stats )

export const isType = ( statType:StatTypes , filepath:string ) => testFSType(statType)(filepath)
export const isDirectory = testFSType(StatTypes.Directory)
export const isFIFO = testFSType(StatTypes.FIFO)
export const isFile = testFSType(StatTypes.File)
export const isSocket = testFSType(StatTypes.Socket)
export const isBlockDevice = testFSType(StatTypes.BlockDevice)
export const isCharacterDevice = testFSType(StatTypes.CharacterDevice)
export const isSymbolicLink = testFSType(StatTypes.SymbolicLink)
