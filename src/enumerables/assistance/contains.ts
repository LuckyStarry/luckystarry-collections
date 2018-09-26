export function contains<T>(
  source: Iterable<T>,
  target: T,
  compare?: (x: T, y: T) => boolean
): boolean {
  if (source) {
    compare = compare || ((x, y) => x === y)
    for (let item of source) {
      if (compare(item, target)) {
        return true
      }
    }
  }
  return false
}
