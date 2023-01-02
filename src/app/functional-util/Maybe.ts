import {Src, Proxy} from "./Proxy";
import {Func} from "./JavaFunctionalInterfaceType";

export type Maybe<T> = T | undefined;
export type MaybeProxy<T> = Proxy<Maybe<T>>;
export type MaybeSrc<T> = Src<Maybe<T>>;

function lift<T, R>(mapper: Func<T, Maybe<R>>): Func<Maybe<T>, Maybe<R>> {
  return (arg: Maybe<T>): Maybe<R> => {
    switch (arg) {
      case undefined: return arg;
      case null: return arg;
      default: return mapper(arg);
    }
  }
}

function optionalAp<T, R>(applier: Maybe<Func<T, R>>): Func<Maybe<T>, Maybe<R>> {
  return lift((t: T) => lift(
      (func: Func<T, R>) => func(t)
    )(applier)
  );
}

export function mapMaybeProxy<T, R>(
  arg: MaybeProxy<T>,
  mapper: Func<T, R>
): MaybeProxy<R> {
  return arg.map(lift(mapper));
}

export function apMaybeProxy<T, R>(arg: MaybeProxy<T>,
                                   applier: MaybeProxy<Func<T, R>>
): MaybeProxy<R> {
  return arg.ap(applier.map(optionalAp));
}

