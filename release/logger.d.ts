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
export declare const stack: () => string[];
export declare const formatValue: (value: any) => string;
export declare const logMap: <T>(label?: string, ...labelArgs: string[]) => (value: T, idx?: number) => T;
export declare const logObservable: <T>(observable: Observable<T>, name?: string) => void;
