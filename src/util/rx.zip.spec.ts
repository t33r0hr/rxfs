import 'mocha'
import expect, { assert } from 'ceylon'
import { Observable, Scheduler } from 'rx'
import { zip } from './rx.zip'

const listA:string[] = [ 'a', 'b', 'c', 'd' ]
const listB:number[] = [ 0, 1, 2, 3 ]

describe('testing zip operator',()=>{

  let observableA:Observable<string>
  let observableB:Observable<number>

  
  it('zips',(done)=>{
    zip(Observable.from(listA), Observable.from(listB)).subscribe ( result => {
      expect(Array.isArray(result)).toBeTrue('result should be an Array, but is: ' + result.constructor.name )
    }, done, done )
  })

})
