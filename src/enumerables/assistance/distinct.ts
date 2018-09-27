export function distinct<T>(
  source: Iterable<T>,
  compare?: (x: T, y: T) => boolean
): Iterable<T> {
  if (source) {
    compare = compare || ((x, y) => x === y)
    let target
    let first = true
    let sub = new Array<T>()
    let count = 0
    for (let item of source) {
      count++
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
    if (count) {
      if (sub.length) {
        return [target, ...distinct(sub, compare)]
      } else {
        return [target]
      }
    }
  }
  return source
}
