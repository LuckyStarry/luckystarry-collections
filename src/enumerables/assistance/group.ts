export function group<T, TKey, TElement = T>(
  source: {
    [Symbol.iterator](): IterableIterator<T>
  },
  keySelector: (item: T) => TKey,
  elementSelector: (item: T) => TElement,
  compare?: (x: TKey, y: TKey) => boolean
): {
  Key: TKey
  List: { [Symbol.iterator](): IterableIterator<TElement> }
}[] {
  let results = new Array<{
    Key: TKey
    List: { [Symbol.iterator](): IterableIterator<TElement> }
  }>()
  if (source) {
    compare = compare || ((x, y) => x === y)
    let target = {} as {
      Key: TKey
      List: { [Symbol.iterator](): IterableIterator<TElement> }
    }
    let first = true
    let list = new Array<TElement>()
    let sub = new Array<T>()
    for (let item of source) {
      if (first) {
        if (item === null || item === undefined) {
          continue
        }
        target.Key = keySelector(item)
        list.push(elementSelector(item))
        first = false
        continue
      }
      if (compare(target.Key, keySelector(item))) {
        list.push(elementSelector(item))
        continue
      }
      sub.push(item)
    }
    target.List = list
    if (sub.length) {
      return [target, ...group(sub, keySelector, elementSelector, compare)]
    } else {
      return [target]
    }
  }
  return results
}
