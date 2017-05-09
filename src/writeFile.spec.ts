import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rxjs'
import * as fs from 'fs'

import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert'

import { writeFile, mapWriteFile } from './writeFile'
import { writeToStream } from 'rxshell'

import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')

const TEST_ROOT = path.join(ROOT,'test')

const TEST_FILE = path.join(TEST_ROOT,'textfile_new.txt')


const testData = `Hello world!
Today is: ${new Date().toString()}

Bye
`

const TEST_BUFFER = new Buffer(testData)

const splitBuffer = ( buffer:Buffer, size:number=10 ) => {
  const chunks = []
  let off = 0
  while(off < buffer.length)
  {
    chunks.push ( buffer.slice(off,off+size))
    off += size
  }
  return chunks
}

const TEST_BUFFER_CHUNKS = splitBuffer(TEST_BUFFER, 20)

describe('test write file',()=>{

  it('writes to file',(done)=>{
     
    const source = Observable.from(TEST_BUFFER_CHUNKS)
    //logObservable(source,'source')
    const ws = fs.createWriteStream(TEST_FILE,'utf8')
    const other = writeToStream(source,ws,'utf8')

    other.subscribe( rows => {
      //console.log('RESULT',rows) 
    }, done, () => {
      //console.log('done!')
      process.nextTick(()=>{
        fs.readFile(TEST_FILE,'utf8',(error,content)=>{
          expect(content).toContain(testData)  
          done()
        })
      })
    } )

  })

})