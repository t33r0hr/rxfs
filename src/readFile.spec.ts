import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rx'
import * as fs from 'fs'

import { readFile } from './readFile'
import * as path from 'path'
const ROOT = path.resolve(__dirname,'..')
const test_json_file = path.join(ROOT,'package.json')

interface ResultAsserter {
  ( item:any, idx?:number):void
}

const asserter = <T>( value:T ) => {
  if ( 'function' === typeof value )
    return value
  return (other:T) => {
    expect(value).toEqual(other)
  }
}

const assertObservable = <T>( source:Observable<T> ) => {

  const assertComplete = ( resultAsserter:ResultAsserter ) => {
    return source.toPromise().then(resultAsserter)
  }

  return {
    toComplete: assertComplete,
    toEmit: ( resultAsserter:ResultAsserter|string|number ) => {
      if ( 'function' !== typeof resultAsserter )
      {
        const value:string|number = resultAsserter
        resultAsserter = <T>( otherValue:T, expected:T ):void => {
          //console.log('value "%s" should be "%s"', expected, otherValue)
          expect<T>(otherValue).toEqual(expected)
        }
      }
      return source.first().toPromise()
        .then ( resultAsserter )
    }
  }
}

const assertFileContent = ( testFile:string ) => {
  const content = fs.readFileSync(testFile,'utf8')
  const contentRows = content.split('\n')
  const contentSource = Observable.fromArray(contentRows)
  return <T extends string|Buffer> ( stream:Observable<T> ) => {
    const mappedStream = <Observable<string>>stream.map(r=> r instanceof Buffer ? r.toString('utf8') : r )
    return contentSource.sequenceEqual(mappedStream)
  }
}

const assertPackageJson = assertFileContent(test_json_file)

describe('test readFile',function(){

  describe('test with existing file',()=>{

    let result

    before(()=>{
      result = readFile(test_json_file,'utf8')
    })
/*
    it('is an observable',()=>{
      const source = readFile(test_json_file,'utf8')
      expect((<any>source).constructor.name).toEqual('Observable')
    })*/

    it('succeeds reading',()=>{
      const source = readFile(test_json_file,'utf8')
      return assertPackageJson(source).toPromise(Promise)
    })

  })



})