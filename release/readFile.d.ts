import { Observable } from 'rxjs';
export interface ReadFileOptions {
    encoding: string;
    flag?: string;
}
export declare const readFile: <T>(filepath: string, encoding?: string | ReadFileOptions) => Observable<T>;
