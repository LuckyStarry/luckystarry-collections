// Lightweight error handling without internationalization
// This replaces the heavy i18n system with simple English messages

export class CollectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CollectionError';
  }
}

export class ArgumentError extends CollectionError {
  constructor(paramName: string, message?: string) {
    super(message || `Invalid argument: ${paramName}`);
    this.name = 'ArgumentError';
  }
}

export class ArgumentNullError extends ArgumentError {
  constructor(paramName: string) {
    super(paramName, `Argument cannot be null: ${paramName}`);
    this.name = 'ArgumentNullError';
  }
}

export class ArgumentOutOfRangeError extends ArgumentError {
  constructor(paramName: string, value?: unknown) {
    const valueStr = value !== undefined ? `: ${String(value)}` : '';
    super(paramName, `Argument out of range: ${paramName}${valueStr}`);
    this.name = 'ArgumentOutOfRangeError';
  }
}

export class InvalidOperationError extends CollectionError {
  constructor(message: string = 'Invalid operation') {
    super(message);
    this.name = 'InvalidOperationError';
  }
}

export class KeyNotFoundError extends CollectionError {
  constructor(key: unknown) {
    super(`Key not found: ${String(key)}`);
    this.name = 'KeyNotFoundError';
  }
}

// Optimized error throwing functions
export function throwIfNull<T>(value: T | null | undefined, paramName: string): asserts value is T {
  if (value == null) {
    throw new ArgumentNullError(paramName);
  }
}

export function throwIfOutOfRange(index: number, length: number, paramName: string = 'index'): void {
  if (index < 0 || index >= length) {
    throw new ArgumentOutOfRangeError(paramName, index);
  }
}

export function throwIfEmpty<T>(source: ArrayLike<T>, message: string = 'Source sequence is empty'): void {
  if (source.length === 0) {
    throw new InvalidOperationError(message);
  }
}

export function throwIfMultipleElements<T>(
  source: ArrayLike<T>,
  message: string = 'Input sequence contains multiple elements'
): void {
  if (source.length > 1) {
    throw new InvalidOperationError(message);
  }
}