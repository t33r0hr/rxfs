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
export declare type FileType = 'file';
export declare type DirType = 'dir';
export declare type FindTypes = FileType | DirType;
export interface FindOptions {
    types?: FindTypes[];
    cwd: string;
}
export declare const find: (args: string | FindOptions) => Observable<string>;
