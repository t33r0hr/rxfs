import { Observable } from 'rxjs';
export interface ReaddirOptions {
    encoding: string;
    flag?: string;
}
export declare const readdir: (filepath: string) => Observable<string>;
