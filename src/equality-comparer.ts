export interface IEqualityComparer<T> {
  Equals(x: T, y: T): boolean
  GetHashCode(obj: T): number
}

const HASH_CODE = Symbol('HASH_CODE')

export abstract class EqualityComparer<T> implements IEqualityComparer<T> {
  public abstract Equals(x: T, y: T): boolean

  public GetHashCode(obj: T): number {
    let hash = 0
    if (obj) {
      if (typeof obj === 'number') {
        return obj
      }
      if (typeof obj === 'string') {
        return stringHashCode(obj)
      }
      hash = obj[HASH_CODE]
      if (hash !== undefined) {
        return hash
      }
      hash = getHashCode()
      obj[HASH_CODE] = hash
    }
    return hash
  }

  public static Default<T>(): EqualityComparer<T> {
    return new DefaultEqualityComparer<T>()
  }
}

class DefaultEqualityComparer<T> extends EqualityComparer<T> {
  public Equals(x: T, y: T): boolean {
    return x === y
  }
}

function getHashCode(): number {
  let timestamp = new Date().valueOf()
  let word = randomWord(6, 32)
  return stringHashCode(word + timestamp.toString())
}

function stringHashCode(text: string): number {
  let hash = 0
  if (text) {
    for (let i = 0; i < text.length; i++) {
      hash = hash * 31 + text.charCodeAt(i)
      hash = intValue(hash)
    }
  }
  return hash
}

function intValue(num) {
  if (num > MAX_VALUE || num < MIN_VALUE) {
    return (num &= 0xffffffff)
  }
  return num
}

const MAX_VALUE = 0x7fffffff
const MIN_VALUE = -0x80000000
const ALPHAS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

function randomWord(min: number, max?: number): string {
  let text = ''
  let length = min
  if (max && max > min) {
    length = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < length; i++) {
    let position = Math.round(Math.random() * (ALPHAS.length - 1))
    text += ALPHAS[position]
  }
  return text
}
