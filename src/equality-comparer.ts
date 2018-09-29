export interface IEqualityComparer<T> {
  Equals(x: T, y: T): boolean
}

export abstract class EqualityComparer<T> implements IEqualityComparer<T> {
  public abstract Equals(x: T, y: T): boolean

  public static Default<T>(): EqualityComparer<T> {
    return new DefaultEqualityComparer<T>()
  }
}

class DefaultEqualityComparer<T> extends EqualityComparer<T> {
  public Equals(x: T, y: T): boolean {
    return x === y
  }
}
