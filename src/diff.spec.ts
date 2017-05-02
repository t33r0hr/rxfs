import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rxjs'
import * as fs from 'fs'

import { logMap } from './logger'
import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert'

import { diff } from './'

import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')

const TEST_ROOT = path.join(ROOT,'test')

const TEST_FILE = path.join(TEST_ROOT,'textfile.txt')
const TEST_FILE_DIFF = path.join(TEST_ROOT,'textfile.diff.txt')

const testFiles = [ TEST_FILE, TEST_FILE_DIFF ]


describe('test diff',()=>{

  it('shows diff',()=>{
    return diff(TEST_FILE,TEST_FILE_DIFF)
      //.map ( logMap('diff') )
      .toPromise()
  })

})