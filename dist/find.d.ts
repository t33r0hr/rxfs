import { Observable } from 'rxjs';
export declare const find: (filepath: string) => Observable<string>;
export declare const findFiles: (filepath: string, pattern?: RegExp) => Observable<string>;
