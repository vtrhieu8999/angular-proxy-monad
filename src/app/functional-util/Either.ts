import {Func} from "./JavaFunctionalInterfaceType";

export function toLeft<L, R>(value: L): Either<L, R>{return new Left(value);}
export function toRight<L, R>(value: R): Either<L, R>{return new Right(value);}

export interface Either<L, R>{
  isLeft(): boolean;
  isRight(): boolean;
  get(): R;
  getLeft(): L;
  map<U>(func: Func<R, U>): Either<L, U>;
  mapLeft<U>(func: Func<L, U>): Either<U, R>;
  flatMap<U>(func: Func<R, Either<L, U>>): Either<L, U>;
  flatMapLeft<U>(func: Func<L, Either<U, R>>): Either<U, R>;
  fold<U>(leftMapper: Func<L, U>, rightMapper: Func<R, U>): U;
}

class Left<L, R> implements Either<L, R>{
  constructor(private result: L){}
  flatMap<U>(func: Func<R, Either<L, U>>): Either<L, U> {return this as unknown as Either<L, U>;}
  flatMapLeft<U>(func: Func<L, Either<U, R>>): Either<U, R> {return func(this.result);}
  fold<U>(leftMapper: Func<L, U>, rightMapper: Func<R, U>): U {return leftMapper(this.result);}
  get(): R {throw new Error('Right element is not exist');}
  getLeft(): L {return this.result;}
  isLeft(): boolean {return true;}
  isRight(): boolean {return false;}
  map<U>(func: Func<R, U>): Either<L, U> {return this as unknown as Either<L, U>;}
  mapLeft<U>(func: Func<L, U>): Either<U, R> {return new Left(func(this.result));}
}

class Right<L, R> implements Either<L, R>{
  constructor(private result: R){}
  flatMap<U>(func: Func<R, Either<L, U>>): Either<L, U> {return func(this.result);}
  flatMapLeft<U>(func: Func<L, Either<U, R>>): Either<U, R> {return this as unknown as Either<U, R>;}
  fold<U>(leftMapper: Func<L, U>, rightMapper: Func<R, U>): U {return rightMapper(this.result);}
  get(): R {return this.result;}
  getLeft(): L {throw new Error('Left element is not exist');}
  isLeft(): boolean {return false;}
  isRight(): boolean {return true;}
  map<U>(func: Func<R, U>): Either<L, U> {return new Right(func(this.result));}
  mapLeft<U>(func: Func<L, U>): Either<U, R> {return this as unknown as Either<U, R>;}
}
