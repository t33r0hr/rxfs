/// <reference types="node" />
import { Observable } from 'rxjs';
import { StderrData, StdoutData } from 'rxshell';
import { ExitCode, ExecResult } from './exec';
export declare function isStderrData<T extends Buffer | string>(other: any): other is StderrData<T>;
export declare function isStdoutData<T extends Buffer | string>(other: any): other is StdoutData<T>;
export interface RxProcess {
    stdout: Observable<Buffer>;
    stderr: Observable<Buffer>;
    close: Observable<ExecResult>;
}
export interface RxProcessResult {
    exitCode: ExitCode;
    errors?: any[];
    data?: any;
}
export declare function spawnProcess(command: string, args: string[], cwd?: string): Observable<RxProcess>;
export declare function spawn(command: string, args: string[], cwd?: string): Observable<RxProcess>;
