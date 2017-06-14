import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rx'
import * as fs from 'fs'

import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert'

import { writeFile, mapWriteFile } from './writeFile'
import { writeToStream } from 'rx-node'

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
