import { Observable } from 'rxjs/Observable';
import { Flags } from './interfaces';
import { RxProcessResult } from './spawn';
export declare const defaultFlags: Flags;
export declare type TouchFlags = typeof defaultFlags;
export declare type TouchOptions = {
    [K in keyof TouchFlags]?: TouchFlags[K];
};
export declare const touch_command: (...args: any[]) => Observable<RxProcessResult>;
export declare function touch(filepath: string, flags?: TouchOptions): Observable<any>;
export declare function _touch(filepath: string, flags?: TouchOptions): Observable<any>;
