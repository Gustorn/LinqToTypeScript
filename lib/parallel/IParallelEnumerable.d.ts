import { IAsyncEnumerable } from "../async/async";
import { IAsyncParallel, IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../shared/shared";
export interface IParallelEnumerable<TSource> extends IAsyncParallel<TSource> {
    concat(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>): IParallelEnumerable<TSource>;
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>;
    except(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>;
    groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>;
    groupBy<TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>;
    groupByWithSel<TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
    intersect(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    joinByKey<TInner, TKey, TResult>(inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
    ofType(type: "object"): IParallelEnumerable<Object>;
    ofType(type: "function"): IParallelEnumerable<Function>;
    ofType(type: "symbol"): IParallelEnumerable<Symbol>;
    ofType(type: "boolean"): IParallelEnumerable<boolean>;
    ofType(type: "number"): IParallelEnumerable<number>;
    ofType(type: "string"): IParallelEnumerable<string>;
    ofType<TResult>(type: IConstructor<TResult>): IParallelEnumerable<TResult>;
    orderBy(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>;
    reverse(): IParallelEnumerable<TSource>;
    select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>;
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
    selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
    sequenceEquals(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    skip(count: number): IParallelEnumerable<TSource>;
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    take(amount: number): IParallelEnumerable<TSource>;
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    union(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    zip<TSecond, TResult>(second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>;
    zip<TSecond>(second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>;
}