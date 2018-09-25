export function distinct<T>(
  source: {
    [Symbol.iterator](): IterableIterator<T>
  },
  compare?: (x: T, y: T) => boolean
): {
  [Symbol.iterator](): IterableIterator<T>
} {
  if (source) {
    compare = compare || ((x, y) => x === y)
    let target
    let first = true
    let sub = new Array<T>()
    for (let item of source) {
      if (first) {
        target = item
        first = false
        continue
      }
      if (compare(target, item)) {
        continue
      }
      sub.push(item)
    }
    if (sub.length) {
      return [target, ...distinct(sub, compare)]
    } else {
      return [target]
    }
  }
  return source
}
