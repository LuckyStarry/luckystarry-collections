export class KeyValuePair<TKey, TValue> {
  private key: TKey
  private value: TValue

  public constructor(key: TKey, value: TValue) {
    this.key = key
    this.value = value
  }

  public get Key(): TKey {
    return this.key
  }

  public get Value(): TValue {
    return this.value
  }
}
