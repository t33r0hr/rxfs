/// <reference types="node" />
import { Observable } from 'rxjs';
export interface ReadFileOptions {
    encoding: string;
    flag?: string;
}
export declare function readFile(filepath: string, encoding: 'utf8'): Observable<string>;
export declare function readFile(filepath: string, encoding: ReadFileOptions): Observable<Buffer>;
