import { Observable } from 'rxjs';
export interface ExitHandler {
    (): void;
}
export declare const file: (content?: string, persist?: boolean) => Observable<string>;
