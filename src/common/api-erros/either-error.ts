export class Left<L> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }
}

export class Right<R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export type Either<L, R> = Left<L> | Right<R>;
export const either = {
  left<L, R>(l: L): Either<L, R> {
    return new Left(l);
  },

  right<L, R>(r: R): Either<L, R> {
    return new Right(r);
  },
} as const;
