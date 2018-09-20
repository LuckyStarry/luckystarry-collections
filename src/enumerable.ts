export interface IEnumerable<T> {
  [Symbol.iterator](): IterableIterator<T>
}

export abstract class Enumerable {
  public static Empty<T>(): IEnumerable<T> {
    return {
      [Symbol.iterator](): IterableIterator<T> {
        return {
          next() {
            return { value: undefined, done: true }
          },
          [Symbol.iterator]: () => {
            return this
          }
        }
      }
    }
  }
}
