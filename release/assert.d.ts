import { Observable } from 'rxjs';
export interface CompareAsserter<T> {
    (item: T, other: T, idx?: number): void;
}
export declare const assertObservables: <T>(source: Observable<T>, target: Observable<T>, asserter: CompareAsserter<T>) => Observable<boolean>;
export declare const compareItems: <T>(item: T, other: T, idx?: number) => void;
export declare const expectObs: <T>(source: Observable<T>) => {
    toMatch: (other: Observable<T>, asserter?: CompareAsserter<T>) => Observable<boolean>;
};
