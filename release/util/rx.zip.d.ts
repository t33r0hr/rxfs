/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import * as Rx from 'rx';
export declare type Tuple<T, K> = [T, K];
export declare function zip<T, K>(observableA: Rx.Observable<T>, observableB: Rx.Observable<K>): Rx.Observable<(T | K)[]>;
