import { Observable } from 'rxjs';
export interface ExitHandler {
    (): void;
}
export declare function fileSync(content?: string, persist?: boolean): string;
export declare function file(content?: string, persist?: boolean): Observable<string>;
export declare function dirSync(dirname?: string, persist?: boolean): string;
export declare function dir(dirname?: string, persist?: boolean): Observable<string>;
