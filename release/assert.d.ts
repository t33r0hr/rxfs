/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Observable } from 'rx';
export interface CompareAsserter<T> {
    (item: T, other: T, idx?: number): void;
}
export declare const assertObservables: <T>(source: Observable<T>, target: Observable<T>, asserter: CompareAsserter<T>) => Observable<boolean>;
export declare const isObservable: <T>(other: any) => other is Observable<T>;
export declare const assertObservable: <T>(other: any) => void;
export declare const compareItems: <T>(item: T, other: T, idx?: number) => void;
export declare const expectObs: <T>(source: Observable<T>) => {
    toMatch: (other: Observable<T>, asserter?: CompareAsserter<T>) => Observable<boolean>;
};
