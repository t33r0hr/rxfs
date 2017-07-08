/// <reference types="node" />
import { Observable } from 'rxjs';
import { ExecResult } from './exec';
export interface RxProcess {
    stdout: Observable<Buffer>;
    stderr: Observable<Buffer>;
    close: Observable<ExecResult>;
}
export declare function spawn(command: string, args: string[], cwd?: string): Observable<RxProcess>;
