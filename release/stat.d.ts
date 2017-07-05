/// <reference types="node" />
import { Observable } from 'rxjs';
import { Stats } from 'fs';
export { Stats };
export declare const stat: (filepath: string) => Observable<any>;
export declare const statSync: (filepath: string) => Stats;
