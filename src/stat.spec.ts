import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rx'
import * as fs from 'fs'

import { logMap } from './logger'

import { stat } from './stat'
import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')
const TEST_DIR = path.join(ROOT)

interface ResultAsserter {
  ( item:any, idx?:number):void
}

interface CompareAsserter<T> {
  ( item:T, other:T, idx?:number):void
}

const assertObservables = <T>( source:Observable<T>, target:Observable<T>, asserter:CompareAsserter<T> ) => {
  return Observable.zip(source,target).flatMap ( ([left,right],idx) => {
    asserter(left,right,idx)
    return Observable.of(true)
  } )
}

const compareItems = <T>( item:T, other:T, idx?:number ) => {
  //console.log('items at %s\n', idx, item, '\n', other, '\n---' )
  expect(item).toEqual(other,`items differ at ${idx}. expected "${item}" to be "${other}"` )
}

describe('test stat',function(){

  describe('test with existing directory',()=>{

    let fs_result

    before((done)=>{
      fs.stat(TEST_DIR,(error,stats)=>{
        if ( error )
        {
          done(error)
        }
        else
        {
          fs_result = stats
          done()
        }
      })
    })

    it('is an observable',()=>{
      expect(stat(TEST_DIR)).toBeA(Observable)
    })

    it('succeeds reading',()=>{
      const source = stat(TEST_DIR)
      //return source.map(logMap('rxfs result')).toPromise()
      return source
        //.map(logMap('rxfs result'))
        .toPromise()
        .then ( rows => expect(rows).toEqual(fs_result) )
      /*return source
        .map(logMap('fs result'))
        .sequenceEqual(Observable
        .from(fs_result)).toPromise()
        .then ( result => expect(result).toBeTrue() )        */
    })

  })



})