export function concat<T>(first: Iterable<T>, second: Iterable<T>): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      yield* first
      yield* second
    }
  }
}
