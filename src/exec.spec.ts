import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable } from 'rxjs'
import * as fs from 'fs'

import { logMap } from './logger'
import { assertObservables, CompareAsserter, compareItems, expectObs } from './assert.spec'

import { exec, ExecOptions, Writable } from './'

import * as path from 'path'

const ROOT = path.resolve(__dirname,'..')

const TEST_ROOT = path.join(ROOT,'test')

describe('test exec',()=>{

  describe(`$ echo "Hello World!"`, () => {

    let stdout:string[]=[]
    let stderr:string[]=[]
    let exitCode:number

    let execError:any

    const logSocket = ( target:string[] ) => {

      const socket:Writable = {
        write: ( data:string|Buffer ) => {
          if ( 'string' === typeof data )
          {
            target.push(data)
          }
          else 
          {
            target.push(data.toString('utf8'))
          }
        }
      }

      return socket
    }

    const logging = {
      stdout: logSocket(stdout),
      stderr: logSocket(stderr)
    }

    const fixtureArg0 = "Hello World!"
    const fixtureOptions:ExecOptions = {
      stdout: logging.stdout,
      stderr: logging.stderr
    }

    before((done)=>{
      exec('echo',[fixtureArg0],fixtureOptions).subscribe ( code => {
        exitCode = code
      },
      error => {
        execError = error
        done(error)
      }, done )
    })


    it('exitcode === 0',()=>{
      expect(exitCode).toEqual(0)
    })


    it(`stdout === "${fixtureArg0}"`,()=>{
      expect(stdout).toHaveLength(1,`stdout has ${stdout.length} lines instead of 1.`)
      expect(stdout[0]).toEqual(fixtureArg0)
    })

    it(`stderr.length === 0`,()=>{
      expect(stderr).toHaveLength(0,`stdout has ${stderr.length} lines instead of 0.`)      
    })

  })

})