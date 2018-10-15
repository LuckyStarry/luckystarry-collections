import { IEnumerable, Enumerable } from './enumerable'
export { IEnumerable, Enumerable }
import { ICollection } from './collection'
export { ICollection }
import { IList, List } from './list'
export { IList, List }
import { IDictionary, Dictionary } from './dictionary'
export { IDictionary, Dictionary }
import { IReadOnlyCollection, ReadOnlyCollection } from './read-only-collection'
export { IReadOnlyCollection, ReadOnlyCollection }
import { IReadOnlyList, ReadOnlyList } from './read-only-list'
export { IReadOnlyList, ReadOnlyList }

export default Enumerable
declare global {
  interface Array<T> extends IEnumerable<T> {}
}

import './array'
