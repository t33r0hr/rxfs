import { Observable } from 'rxjs';
export declare enum StatTypes {
    Directory = 0,
    FIFO = 1,
    File = 2,
    Socket = 3,
    BlockDevice = 4,
    CharacterDevice = 5,
    SymbolicLink = 6,
}
export declare const exists: (filepath: string) => Observable<boolean>;
export declare const isType: (statType: StatTypes, filepath: string) => Observable<boolean>;
export declare const isDirectory: (filepath: string) => Observable<boolean>;
export declare const isFIFO: (filepath: string) => Observable<boolean>;
export declare const isFile: (filepath: string) => Observable<boolean>;
export declare const isSocket: (filepath: string) => Observable<boolean>;
export declare const isBlockDevice: (filepath: string) => Observable<boolean>;
export declare const isCharacterDevice: (filepath: string) => Observable<boolean>;
export declare const isSymbolicLink: (filepath: string) => Observable<boolean>;
