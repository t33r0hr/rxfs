/// <reference types="node" />
import { Observable } from 'rxjs/Observable';
import { RxProcessResult } from './spawn';
export declare function command(commandName: string, stdout?: NodeJS.Socket): (...args: any[]) => Observable<RxProcessResult>;
