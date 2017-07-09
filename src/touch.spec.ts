import 'mocha'
import expect, { assert } from 'ceylon'
import * as path from 'path'
import * as fs from 'fs'

import { touch } from './touch'

process.env.NODE_ENV = 'debug'

const TEST_FILE_ROOT = path.resolve('./test')

const randomTestFileName = () => {
  const filename = `test_target_${Math.floor(Math.random()*(1000))}.txt`
  return path.join(TEST_FILE_ROOT,filename)
}

const createFile = (filename:string) => {
  fs.writeFileSync(filename,'','utf8')
}

const deleteFile = (filename:string) => {
  fs.unlinkSync(filename)
}

const times = ( num:number, callback:{(idx?:number):any} ) => {
  return ' '.repeat(num).split(' ').map ( (c,i) => callback(i) )
}

describe(`Test touch`,function(){
  
  describe ( `touch file creation`, () => {
  
    let fixtureFilename:string = randomTestFileName()
    let firstStats:fs.Stats

    describe ( `touch ${fixtureFilename}`, () => {

      let result:fs.Stats      
      
      before((done)=>{
        touch(fixtureFilename).subscribe( stat => {
          console.log('firstStats.atime',stat.atime)
          result = stat
          firstStats = Object.assign({},stat)
        }, done, done )
      })
/*
      after((done)=>{
        deleteFile(fixtureFilename)
        done()
      })*/

      it(`returned stats`,()=> {
        expect(result.isFile()).toEqual(true)
        expect(result).toBeAn(Object)
      })

    })

    describe ( `update ${fixtureFilename}`, () => {

      let result:fs.Stats      
      
      before((done)=>{
        setTimeout(()=>{
          touch(fixtureFilename,{a: true}).delay(100).subscribe( stat => {
            console.log('firstStats.atime',firstStats.atime)
            console.log('result.atime',stat.atime)
            result = stat
          }, done, done )
        },400)          
      })

      after((done)=>{
        deleteFile(fixtureFilename)
        done()
      })

      it(`returned updated stats`,()=> {
        expect(result.isFile()).toEqual(true)
        expect(result.atime).toNotEqual(firstStats.atime)
      })

    })

  } )

})

