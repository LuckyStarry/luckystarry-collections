export function group<T, TKey, TElement = T>(
  source: Iterable<T>,
  keySelector: (item: T) => TKey,
  elementSelector: (item: T) => TElement,
  compare?: (x: TKey, y: TKey) => boolean
): {
  Key: TKey
  List: Iterable<TElement>
}[] {
  if (source) {
    let results = new Array<{
      Key: TKey
      List: Iterable<TElement>
    }>()
    compare = compare || ((x, y) => x === y)
    let target = {} as {
      Key: TKey
      List: Iterable<TElement>
    }
    let first = true
    let list = new Array<TElement>()
    let sub = new Array<T>()
    let count = 0
    for (let item of source) {
      if (first) {
        if (item === null || item === undefined) {
          continue
        }
        target.Key = keySelector(item)
        list.push(elementSelector(item))
        first = false
        count++
        continue
      }
      count++
      if (compare(target.Key, keySelector(item))) {
        list.push(elementSelector(item))
        continue
      }
      sub.push(item)
    }
    if (count) {
      target.List = list
      if (sub.length) {
        return [target, ...group(sub, keySelector, elementSelector, compare)]
      } else {
        return [target]
      }
    }
    return results
  }
  return source === undefined ? undefined : null
}
