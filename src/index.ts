import './array'
import { ICollection } from './collection'
import { Dictionary, IDictionary } from './dictionary'
import { Enumerable, IEnumerable } from './enumerable'
import { IList, List } from './list'
import { IReadOnlyCollection, ReadOnlyCollection } from './read-only-collection'
import { IReadOnlyList, ReadOnlyList } from './read-only-list'
export { IEnumerable, Enumerable }
export { ICollection }
export { IList, List }
export { IDictionary, Dictionary }
export { IReadOnlyCollection, ReadOnlyCollection }
export { IReadOnlyList, ReadOnlyList }

export default Enumerable
declare global {
  interface Array<T> extends IEnumerable<T> {}
}
