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
export * from './interfaces';
export * from './exec';
export * from './find';
export * from './diff';
export * from './readFile';
export * from './writeFile';
export * from './readdir';
export * from './mkdir';
export * from './stat';
import * as tmp from './tmp';
export { tmp };
export * from './exists';
export * from './from';
export declare const readdir: (filepath: string) => Observable<string>;
