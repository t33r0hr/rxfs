/// <reference types="node" />
import * as fs from 'fs';
import { Observable } from 'rxjs';
export declare const statSync: (filename: string | Buffer) => fs.Stats;
export declare const existsSync: (filename: string | Buffer) => boolean;
export declare const async: {
    stat: (...args: any[]) => Promise<{}>;
    mkdir: (filepath: string, p?: boolean) => Promise<void>;
    readFile: (...args: any[]) => Promise<{}>;
    unlink: (...args: any[]) => Promise<{}>;
    writeFile: (...args: any[]) => Promise<{}>;
    readdir: (...args: any[]) => Promise<{}>;
};
export declare const readfileFull: (filepath: string, full?: boolean) => Observable<string>;
export declare const readFile: (filename: string, ...args: any[]) => Observable<string>;
export declare const writeFile: (filename: string, content: string | Buffer, ...args: any[]) => Observable<string>;
export declare const readfile: (filepath: string, full?: boolean) => Observable<string>;
export declare const readDir: (filename: string) => Observable<string>;
export declare const readstats: (filepath: string) => Observable<fs.Stats>;
export declare const unlink: (filepath: string) => Observable<boolean>;
export declare const mkdir: (filepath: string) => Observable<string>;
