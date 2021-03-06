import { IPrototype } from "./Interfaces";
export { StrictEqualityComparer, EqualityComparer, StringifyComparer, NumberComparer, AsTuple, InvalidOperationException, ArgumentOutOfRangeException } from "./TypesAndHelpers";
export { IComparer, IConstructor, IEnumerable, IGrouping, IOrderedEnumerable, IEqualityComparer, IPrototype, RecOrdMap, ITuple } from "./Interfaces";
export { IAsyncEnumerable } from "./AsyncInterfaces";
export { ArrayEnumerable, BasicEnumerable, Enumerable } from "./Enumerable";
export { AsyncEnumerable } from "./AsyncEnumerable";
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void;
export declare function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(object: IPrototype<T, Y>): void;
export declare function initializeLinq(): void;
