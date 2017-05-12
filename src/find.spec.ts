import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rxjs'
import * as fs from 'fs'

import { logMap } from './logger'
import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert'

import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')

const TEST_ROOT = path.join(ROOT,'test')

const TEST_DIR = path.join(TEST_ROOT,'directory')
const TEST_DIR_LINK = path.join(TEST_ROOT,'directoryLink')
const TEST_FILE_EMPTY = path.join(TEST_ROOT,'emptyFile')
const TEST_FILE = path.join(TEST_ROOT,'textfile.txt')

import { find } from './find'

describe('test find',()=>{

  it('finds',(done)=>{
    find(TEST_ROOT)
      .subscribe(
          filepath => {
            expect(filepath).toBeA('string')
            expect(filepath).toContain(TEST_ROOT+'/')
            console.log('filepath',filepath)
          },
          done,
          done
        )

  })


})