import { Observable } from 'rxjs';
export interface UnlinkOptions {
    recursive?: boolean;
    force?: boolean;
}
export declare const unlink: (filepath: string, options?: UnlinkOptions) => Observable<boolean>;
