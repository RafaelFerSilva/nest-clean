export class Left<T, E> {
  readonly value: T | E

  constructor(value: T | E) {
    this.value = value
  }

  // public static of<T, E>(value: T | E): Left<T, E> {
  //     return new Left(value);
  // }

  public isLeft(): this is Left<T, E> {
    return true
  }

  public isRight(): this is Right<T, E> {
    return false
  }

  // public getValue(): T | E {
  //     return this.value;
  // }
}

export class Right<T, E> {
  readonly value: T | E

  constructor(value: T | E) {
    this.value = value
  }

  // public static of<T, E>(value: T | E): Right<T, E> {
  //     return new Right(value);
  // }

  public isLeft(): this is Left<T, E> {
    return false
  }

  public isRight(): this is Right<T, E> {
    return true
  }

  // public getValue(): T | E {
  //     return this.value;
  // }
}

export type Either<T, E> = Left<T, E> | Right<T, E>

export const left = <T, E>(value: T): Either<T, E> => {
  return new Left<T, E>(value)
}

export const right = <T, E>(value: E): Either<T, E> => {
  return new Right<T, E>(value)
}
