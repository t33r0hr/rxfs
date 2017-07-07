import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rxjs'
import * as fs from 'fs'
import { logMap } from './logger'
import { unlink } from './unlink'
import * as path from 'path'

const ROOT = path.resolve(__dirname,'../test')
const TEST_FILE_DEL = path.join(ROOT,'test-delete-file.txt')
const TEST_DIR_DEL = path.join(ROOT,'test-delete-directory')

const createTestFile = ( ) => {
  if ( fs.existsSync(TEST_FILE_DEL) )
    return true
  return fs.writeFileSync(TEST_FILE_DEL,'TEST FILE')
}

const createTestDir = ( ) => {
  if ( fs.existsSync(TEST_DIR_DEL) )
    return true
  return fs.mkdirSync(TEST_DIR_DEL)
}

interface ResultAsserter {
  ( item:any, idx?:number):void
}

interface CompareAsserter<T> {
  ( item:T, other:T, idx?:number):void
}

interface MockFn {
  (...args:any[]):any
  called:boolean
}


describe('test unlink',function(){

  describe('test with existing directory',()=>{

    let returnValue:boolean
    let error:Error

    before((done)=>{
      createTestDir()
      unlink(TEST_DIR_DEL,{recursive: true}).subscribe ( success => {
        returnValue = success
      }, _error => {
        error = _error
        done(error)
      }, done )
    })

    it('no error',()=>{
      expect(error).toNotExist()
    })

    it('returns true',()=>{
      expect(returnValue).toEqual(true)
    })

    it('directory is deleted',()=>{
      expect(fs.existsSync(TEST_DIR_DEL)).toEqual(false,`fs.existsSync(${TEST_DIR_DEL}) returned true.`)
    })

  })

  describe('test with non-existing directory', ()=>{

    let onError:MockFn
    let onNext:MockFn
    let onComplete:MockFn


    let returnValue:boolean
    let error:Error

    before((done)=>{
      
      onError = Object.assign(( _error ) => {error=_error; onError.called = true; done()},{called: false})
      onNext = Object.assign(( value ) => {onNext.called = true},{called: false})
      onComplete = Object.assign(( ) => {onComplete.called = true; done()},{called: false})      
      
      unlink(TEST_DIR_DEL,{recursive: true}).subscribe ( onNext, onError, onComplete )
    })

    it('has error',()=>{
      expect(error).toExist()
    })

    it('did not call onNext',()=>{
      expect(onNext).toIncludeKey('called')
      expect(onNext.called).toEqual(false)
    })

  })

  describe('test with existing file',()=>{

    let returnValue:boolean
    let error:Error

    before((done)=>{
      createTestFile()
      unlink(TEST_FILE_DEL).subscribe ( success => {
        returnValue = success
      }, _error => {
        error = _error
        done(error)
      }, done )
    })

    it('no error',()=>{
      expect(error).toNotExist()
    })

    it('returns true',()=>{
      expect(returnValue).toEqual(true)
    })

    it('file is deleted',()=>{
      expect(fs.existsSync(TEST_FILE_DEL)).toEqual(false,`fs.existsSync(${TEST_FILE_DEL}) returned true.`)
    })

  })

  describe('test with non-existing file', ()=>{

    let onError:MockFn
    let onNext:MockFn
    let onComplete:MockFn


    let returnValue:boolean
    let error:Error

    before((done)=>{
      
      onError = Object.assign(( _error ) => {error=_error; onError.called = true; done()},{called: false})
      onNext = Object.assign(( value ) => {onNext.called = true},{called: false})
      onComplete = Object.assign(( ) => {onComplete.called = true; done()},{called: false})      
      
      unlink(TEST_FILE_DEL).subscribe ( onNext, onError, onComplete )
    })

    it('has error',()=>{
      expect(error).toExist()
    })

    it('did not call onNext',()=>{
      expect(onNext).toIncludeKey('called')
      expect(onNext.called).toEqual(false)
    })

  })

})