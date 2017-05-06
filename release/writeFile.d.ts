/// <reference types="node" />
import { Observable } from 'rxjs';
export interface WriteFileOptions {
    encoding: string;
    flag?: string;
}
export declare const writeFile: (filepath: string, content: Observable<Buffer>, encoding?: string | WriteFileOptions) => Observable<boolean | Buffer>;
export declare const mapWriteFile: (filepath: string, content: Observable<Buffer>, encoding?: string | WriteFileOptions) => Observable<Buffer>;
