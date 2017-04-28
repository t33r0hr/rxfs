import { Observable } from 'rxjs';
export interface CallbackFunction<T> {
    (error: Error, result?: T): void;
}
export interface TargetFunction<T, U, V> {
    (callback: CallbackFunction<T>): any;
    (arg0: U, callback: CallbackFunction<T>): any;
    (arg0: U, arg1: V, callback: CallbackFunction<T>): any;
}
export interface ObservalizedFunction<T> {
    (): Observable<T>;
}
export interface Callable<T> {
    (): Promise<T>;
    (arg1: any): Promise<T>;
    (arg1: any, arg2: any): Promise<T>;
}
export declare const _promisify: <T0, T1, T2>(func: Function) => Callable<T0>;
export declare const _observalize: (target: Function) => Callable<{}>;
