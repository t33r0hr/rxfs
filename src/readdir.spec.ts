import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rx'
import * as fs from 'fs'

import { logMap } from './logger'

import { readdir } from './readdir'
import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')
const TEST_DIR = path.join(ROOT)

interface ResultAsserter {
  ( item:any, idx?:number):void
}

interface CompareAsserter<T> {
  ( item:T, other:T, idx?:number):void
}


describe('test readdir',function(){

  describe('test with existing directory',()=>{

    let fs_result

    before((done)=>{
      fs.readdir(TEST_DIR,(error,contents)=>{
        if ( error )
        {
          done(error)
        }
        else
        {
          fs_result = contents.sort()
          done()
        }
      })
    })

    it('is an observable',()=>{
      expect(readdir(TEST_DIR)).toBeA(Observable)
    })

    it('succeeds reading',()=>{
      const source = readdir(TEST_DIR)
      //return source.map(logMap('rxfs result')).toPromise()
      return source
        //.map(logMap('fs result'))
        .toArray()
        .toPromise()
        .then ( rows => expect(rows.sort()).toEqual(fs_result) )
      /*return source
        .map(logMap('fs result'))
        .sequenceEqual(Observable
        .from(fs_result)).toPromise()
        .then ( result => expect(result).toBeTrue() )        */
    })

  })



})