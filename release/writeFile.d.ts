/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
/// <reference types="node" />
import { Observable } from 'rx';
export interface WriteFileOptions {
    encoding: string;
    flag?: string;
}
export declare const writeFile: (filepath: string, content: Observable<Buffer>, encoding?: string | WriteFileOptions) => Rx.Disposable;
export declare const mapWriteFile: (filepath: string, content: Observable<Buffer>, encoding?: string | WriteFileOptions) => Observable<Buffer>;
