/// <reference types="node" />
import { Observable } from 'rxjs';
import * as rxshell from 'rxshell';
import { Writable } from './interfaces';
export declare type ExitCode = number;
export interface ExecOptions {
    silent?: boolean;
    args?: string[];
    cwd?: string;
    stdout?: Writable;
    stderr?: Writable;
    bailOnStderr?: boolean;
}
export interface ExecResult {
    exitCode: ExitCode;
    stderr: Buffer[];
    stdout: Buffer[];
}
export declare function isExecOptions(other: any): other is ExecOptions;
export declare function isChildProcessOptions(other: any): other is rxshell.ChildProcessOptions<Buffer>;
export declare function exec<T extends rxshell.ChildProcessOptions<Buffer>>(command: T, args?: string[] | ExecOptions, options?: ExecOptions): Observable<ExitCode>;
export declare function exec<T extends string>(command: T, args?: string[], options?: ExecOptions): Observable<ExitCode>;
