import { IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple, RecOrdMap } from "./Interfaces"

export interface IAsyncGrouping<TKey, TValue> extends AsyncIterableIterator<TValue> {
    readonly key: TKey
}

export interface IAsyncEnumerable<TSource> extends AsyncIterable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
    aggregate<TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>,
    all(predicate: (x: TSource) => boolean): Promise<boolean>,
    any(predicate?: (x: TSource) => boolean): Promise<boolean>,
    average(this: IAsyncEnumerable<number>): Promise<number>
    average(selector: (x: TSource) => number): Promise<number>,
    concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    each(action: (x: TSource) => void): IAsyncEnumerable<TSource>,
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    groupBy(keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    groupBy(keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>,
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => number),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => string),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>,
    intersect(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>,
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    max(this: IAsyncEnumerable<number>): Promise<number | never>,
    max(selector: (x: TSource) => number): Promise<number | never>,
    min(this: IAsyncEnumerable<number>): Promise<number | never>,
    min(selector: (x: TSource) => number): Promise<number | never>,
    /* tslint:disable:ban-types */
    ofType(type: "object"): IAsyncEnumerable<Object>
    ofType(type: "function"): IAsyncEnumerable<Function>
    ofType(type: "symbol"): IAsyncEnumerable<Symbol>
    /* tslint:enable:ban-types */
    ofType(type: "boolean"): IAsyncEnumerable<boolean>
    ofType(type: "number"): IAsyncEnumerable<number>
    ofType(type: "string"): IAsyncEnumerable<string>
    ofType<TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>,
    orderBy(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    orderByDescending(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    reverse(): IAsyncEnumerable<TSource>,
    select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    select<TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>,
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IAsyncEnumerable<OUT>,
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IAsyncEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IAsyncEnumerable<TOut>,
    sequenceEquals(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    skip(count: number): IAsyncEnumerable<TSource>,
    skipWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    sum(this: IAsyncEnumerable<number>): Promise<number>
    sum(this: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>,
    take(amount: number): IAsyncEnumerable<TSource>,
    takeWhile(pedicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    toArray(): Promise<TSource[]>
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>,
    toSet(): Promise<Set<TSource>>,
    union(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    zip<TSecond, TResult>(
        second: IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>,
    zip<TSecond>(second: IAsyncEnumerable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>,
    [Symbol.asyncIterator]: () => AsyncIterableIterator<TSource>
}

export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    getMap: {
        (): Promise<RecOrdMap<TSource>>,
    }
}
