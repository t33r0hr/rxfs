import { Observable } from 'rxjs';
export declare function parseRegExpr(source: string): RegExp;
export declare function fromFile(filepath: string, include?: boolean): Observable<(other: any, idx?: number) => boolean>;
