import { Observable } from 'rx'
import expect, { assert } from 'ceylon'

export interface CompareAsserter<T> {
  ( item:T, other:T, idx?:number):void
}


type Zipped<T,K> = [T,K]

export const assertObservables = <T>( source:Observable<T>, target:Observable<T>, asserter:CompareAsserter<T> ) => {
  return Observable.zip(source,target).flatMap ( ([left,right],idx) => {
    //console.log('left,right %s',idx,left,right)
    asserter(left,right,idx)
    return Observable.of(true)
  } )
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