import { IEnumerable } from '../enumerable'

export function asEnumerable<TSource>(source: IEnumerable<TSource> | Iterable<TSource>): IEnumerable<TSource> {
  return [...source]
}

declare global {
  interface Array<T> extends IEnumerable<T> {}
}
