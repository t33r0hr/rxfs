import { Observable } from 'rxjs';
export declare const stack: () => string[];
export declare const formatValue: (value: any) => string;
export declare const logMap: <T>(label?: string, ...labelArgs: string[]) => (value: T, idx?: number) => T;
export declare const logObservable: <T>(observable: Observable<T>, name?: string) => void;
