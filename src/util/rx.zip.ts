import * as Rx from 'rx'

export type Tuple<T,K> = [T,K]

export function zip <T,K>( observableA:Rx.Observable<T>, observableB:Rx.Observable<K> ) {
  return Rx.Observable.zip(observableA, observableB,(valueA, valueB)=>([valueA,valueB]))
}