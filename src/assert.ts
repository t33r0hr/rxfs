import { Observable } from 'rx'
import expect, { assert } from 'ceylon'

export interface CompareAsserter<T> {
  ( item:T, other:T, idx?:number):void
}

export const assertObservables = <T>( source:Observable<T>, target:Observable<T>, asserter:CompareAsserter<T> ) => {
  let idx = 0
  return Observable.zip(source,target,(left:T,right:T)=>([left,right]))
    .flatMap ( ([left,right]) => {
      //console.log('left,right %s',idx,left,right)
      asserter(left,right,idx++)
      return Observable.of(true)
    } )
}

export const isObservable = <T>( other:any ):other is Observable<T> => {
  return Observable.prototype.isPrototypeOf(other)
}

export const assertObservable = <T> ( other:any ) => {
  expect(isObservable(other)).toEqual(true,'Should be an observable, but is a ' + other.constructor.name )
}

export const compareItems = <T>( item:T, other:T, idx?:number ) => {
  //console.log('items at %s\n', idx, item, '\n', other, '\n---' )
  expect(item).toEqual(other,`items differ at ${idx}. expected "${item}" to be "${other}"` )
}


export const expectObs = <T>( source:Observable<T> ) => {
  return {
    toMatch: ( other:Observable<T>, asserter:CompareAsserter<T>=compareItems ) => assertObservables ( source, other, asserter )
  }
}