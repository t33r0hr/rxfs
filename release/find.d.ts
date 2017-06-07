import { Observable } from 'rxjs';
export declare type FileType = 'file';
export declare type DirType = 'dir';
export declare type FindTypes = FileType | DirType;
export interface FindOptions {
    types?: FindTypes[];
    cwd: string;
}
export declare const find: (args: string | FindOptions) => Observable<string>;
