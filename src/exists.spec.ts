import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rx'
import * as fs from 'fs'

import { logMap } from './logger'
import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert'

import { exists, existsSync, StatTypes, isType, isDirectory, isFile, isSymbolicLink, isSocket } from './exists'
import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')

const TEST_ROOT = path.join(ROOT,'test')

const TEST_DIR = path.join(TEST_ROOT,'directory')
const TEST_DIR_LINK = path.join(TEST_ROOT,'directoryLink')
const TEST_FILE_EMPTY = path.join(TEST_ROOT,'emptyFile')
const TEST_FILE = path.join(TEST_ROOT,'textfile.txt')

const testFiles = [
  {  fsType: StatTypes.Directory, path: TEST_DIR },
  {  fsType: StatTypes.SymbolicLink, path: TEST_DIR_LINK },
  {  fsType: StatTypes.File, path: TEST_FILE }
]

const assertFsType = ( filepath:string, fstype:StatTypes, expected:boolean ) => {
  return expectObs(isType(fstype,filepath)).toMatch(Observable.of(expected))
}

describe('test exists.ts',()=>{

  describe('exists() on existing folder',()=>{

    it('returns true',()=>{

      return expectObs(exists(TEST_DIR)).toMatch(Observable.of(true)).toPromise()

    })

  })

  describe('exists() on existing files',()=>{

    it(`returns true for directory ${TEST_DIR}`,()=>{
      return expectObs(exists(TEST_DIR)).toMatch(Observable.of(true)).toPromise()
    })

    it(`returns true for directory link ${TEST_DIR_LINK}`,()=>{
      return expectObs(exists(TEST_DIR_LINK)).toMatch(Observable.of(true)).toPromise()
    })

    it(`returns true for file ${TEST_FILE}`,()=>{
      return expectObs(exists(TEST_FILE)).toMatch(Observable.of(true)).toPromise()
    })

    it(`returns true for empty file ${TEST_FILE_EMPTY}`,()=>{
      return expectObs(exists(TEST_FILE_EMPTY)).toMatch(Observable.of(true)).toPromise()
    })

  })

  describe('existsSync() on existing folder',()=>{

    it('returns true',()=>{

      expect(existsSync(TEST_DIR)).toEqual(true)

    })

  })

  describe('existsSync() on existing files',()=>{

    it(`returns true for directory ${TEST_DIR}`,()=>{
      expect(existsSync(TEST_DIR)).toEqual(true)
    })

    it(`returns true for directory link ${TEST_DIR_LINK}`,()=>{
      expect(existsSync(TEST_DIR_LINK)).toEqual(true)
    })

    it(`returns true for file ${TEST_FILE}`,()=>{
      expect(existsSync(TEST_FILE)).toEqual(true)
    })

    it(`returns true for empty file ${TEST_FILE_EMPTY}`,()=>{
      expect(existsSync(TEST_FILE_EMPTY)).toEqual(true)
    })

  })

  describe('match fs type: '+StatTypes[StatTypes.Directory],()=>{

    it(`matches for ${TEST_DIR}`,()=>{
      return assertFsType(TEST_DIR,StatTypes.Directory,true)
    })
    
    it(`fails for ${TEST_FILE}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.Directory,false)
    })
    
    it(`fails for ${TEST_DIR_LINK}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.Directory,false)
    })

  })

  describe('match fs type: '+StatTypes[StatTypes.File],()=>{

    it(`fails for ${TEST_DIR}`,()=>{
      return assertFsType(TEST_DIR,StatTypes.File,false)
    })
    
    it(`matches for ${TEST_FILE}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.File,true)
    })
    
    it(`fails for ${TEST_DIR_LINK}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.File,false)
    })

  })

  describe('match fs type: '+StatTypes[StatTypes.SymbolicLink],()=>{

    it(`fails for ${TEST_DIR}`,()=>{
      return assertFsType(TEST_DIR,StatTypes.SymbolicLink,false)
    })
    
    it(`fails for ${TEST_FILE}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.SymbolicLink,false)
    })
    
    it(`matches for ${TEST_DIR_LINK}`,()=>{
      return assertFsType(TEST_FILE,StatTypes.SymbolicLink,true)
    })

  })

})