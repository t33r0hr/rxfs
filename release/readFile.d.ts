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
import { StreamData } from 'rxshell';
export interface ReadFileOptions {
    encoding: string;
    flag?: string;
}
export declare const readFile: (filepath: string, encoding?: string | ReadFileOptions) => Observable<StreamData<string | Error | Buffer>>;
