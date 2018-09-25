import { ArgumentNullException, InvalidOperationException } from '../exceptions'

export function ThrowIfNull(name: string, target: any) {
  if (target === null || target === undefined) {
    throw new ArgumentNullException(name)
  }
}

export function ThrowInvalidOperation(message: string): never {
  throw new InvalidOperationException(message)
}
