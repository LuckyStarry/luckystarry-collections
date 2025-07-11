import { Enumerable, IEnumerable } from '../enumerable'
import * as utils from '../utils'

export function selectMany<TSource, TCollection, TResult = TCollection>(
  source: Iterable<TSource>,
  collectionSelector: (item: TSource, index?: number) => IEnumerable<TCollection>,
  resultSelector?: (item: TSource, collection: TCollection) => TResult
): IEnumerable<TResult> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('collectionSelector', collectionSelector)
  const _resultSelector: any = resultSelector || ((item, collection) => collection)
  return Enumerable.AsEnumerable(mapping<TSource, TCollection, TResult>(source, collectionSelector, _resultSelector))
}

function* mapping<TSource, TCollection, TResult = TCollection>(
  source: Iterable<TSource>,
  collectionSelector: (item: TSource, index?: number) => IEnumerable<TCollection>,
  resultSelector?: (item: TSource, collection: TCollection) => TResult
): Iterable<TResult> {
  let index = 0
  for (const item of source) {
    const collections = collectionSelector(item, index++)
    if (collections) {
      for (const collection of collections) {
        yield resultSelector(item, collection)
      }
    }
  }
}
