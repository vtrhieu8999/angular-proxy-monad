import {First, Second, toFirst, toSecond} from "./TypeUnion";
import {Func, mergeSets} from "./JavaFunctionalInterfaceType";
import {Proxy, TryMaybeProxy} from "./Proxy";
import {apMaybeProxy, mapMaybeProxy} from "./Maybe";

export type Try<T> = First<T> | Second<readonly Error[]>;
export type TryProxy<T> = Proxy<Try<T>>;
export type ExtractTry<T> = T extends Try<infer U> ?(T extends First<U> ? U : Error[]): T;

export function mapTryProxy<T, R>(
  arg: TryProxy<T>,
  mapper: Func<T, R>
): TryProxy<R> {
  return arg.map(liftTry(mapper));
}

export function apTryProxy<T, R>(
  arg: TryProxy<T>,
  applier: TryProxy<Func<T, R>>
): TryProxy<R> {
  return arg.ap(applier.map(apTry));
}

export function success<T>(value: T): Try<T>{
  return toFirst(value);
}

export function failure<T>(...values: Error[]): Try<T>{
  return toSecond(values);
}

export function mapTryMaybeProxy<T, R>(
  arg: TryMaybeProxy<T>,
  mapper: Func<T, R>
): TryMaybeProxy<R> {
  return mapMaybeProxy(arg, liftTry(mapper));
}

export function apTryMaybeProxy<T, R>(
  arg: TryMaybeProxy<T>,
  applier: TryMaybeProxy<Func<T, R>>
): TryMaybeProxy<R> {
  return apMaybeProxy(arg, mapMaybeProxy(applier, apTry));
}

function liftTry<T, R>(mapper: Func<T, R>): Func<Try<T>, Try<R>> {
  return (arg: Try<T>): Try<R> => {
    switch (arg.tag){
      case First: return success(mapper(arg.result));
      case Second: return arg;
    }
  }
}

function apTry<T, R>(applier: Try<Func<T, R>>): Func<Try<T>, Try<R>> {
  return (arg: Try<T>): Try<R> => {
    switch (arg.tag){
      case First: switch (applier.tag){
        case First: return success(applier.result(arg.result));
        case Second: return applier;
      } break;
      case Second: switch (applier.tag){
        case First: return arg;
        case Second: return toSecond(mergeSets(arg.result, applier.result));
      }
    }
  }
}


