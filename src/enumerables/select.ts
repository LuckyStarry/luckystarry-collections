import { IEnumerable } from '../enumerable'
import { EnumerableContainer } from './enumerable-container'
import * as utils from '../utils'

export function select<TSource, TResult>(
  source: Iterable<TSource>,
  selector: (item: TSource, index?: number) => TResult
): IEnumerable<TResult> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('selector', selector)
  return new EnumerableContainer([...mapping(source, selector)])
}

function* mapping<TSource, TResult>(
  source: Iterable<TSource>,
  selector: (item: TSource, index?: number) => TResult
): Iterable<TResult> {
  let index = 0
  for (let item of source) {
    yield selector(item, index++)
  }
}
