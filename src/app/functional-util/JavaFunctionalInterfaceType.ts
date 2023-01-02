export type Runnable = () => void;
export type Consumer<T> = (value: T) => void;
export type BiConsumer<T1, T2> = Func2<T1, T2, void>;
export type TriConsumer<T1, T2, T3> = Func3<T1, T2, T3, void>;
export type Supplier<T> = () => T;
export type Predicate<T> = Func<T, boolean>;
export type BiPredicate<T, R> = Func2<T, R, boolean>;
export type Comparator<T> = BiPredicate<T, T>;
export type Func<T, R> = (arg: T) => R;
export type Func2<T1, T2, R> = (arg1: T1, arg2: T2) => R;
export type CurriedFunc2<T1, T2, R> = (arg1: T1) => (arg2: T2) => R;
export type Func3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;
export type CurriedFunc3<T1, T2, T3, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => R;
export type Func4<T1, T2, T3, T4, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;
export type CurriedFunc4<T1, T2, T3, T4, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => (arg4: T4) => R;
export type Func5<T1, T2, T3, T4, T5, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R;
export type CurriedFunc5<T1, T2, T3, T4, T5, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => (arg4: T4) => (arg5: T5) => R;
export type Func6<T1, T2, T3, T4, T5, T6, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R;
export type CurriedFunc6<T1, T2, T3, T4, T5, T6, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => (arg4: T4) => (arg5: T5) => (arg6: T6) => R;
export type Func7<T1, T2, T3, T4, T5, T6, T7, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => R;
export type CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => (arg4: T4) => (arg5: T5) => (arg6: T6) => (arg7: T7) => R;
export type Func8<T1, T2, T3, T4, T5, T6, T7, T8, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => R;
export type CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R> = (arg1: T1) => (arg2: T2) => (arg3: T3) => (arg4: T4) => (arg5: T5) => (arg6: T6) => (arg7: T7) => (arg8: T8) => R;

export function mergeSets<T>(array: readonly T[], ...arrays: (readonly T[])[]): readonly T[] {
  const result: T[] = Array.from(array);
  for (let arr of arrays)
    for (let instance of arr)
      if (!has(result, instance))
        result.push(instance);
  return Object.freeze(result);
}

function has<R>(arr: R[], value: R): boolean {
  for (let a of arr)
    if (a === value) return true;
  return false;
}

export function curry2<T1, T2, R>(func: Func2<T1, T2, R>): CurriedFunc2<T1, T2, R>{
  return a1 => a2 => func(a1, a2);
}
export function curry3<T1, T2, T3, R>(func: Func3<T1, T2, T3, R>): CurriedFunc3<T1, T2, T3, R>{
  return a1 => a2 => a3 => func(a1, a2, a3);
}
export function curry4<T1, T2, T3, T4, R>(func: Func4<T1, T2, T3, T4, R>): CurriedFunc4<T1, T2, T3, T4, R>{
  return a1 => a2 => a3 => a4 => func(a1, a2, a3, a4);
}
export function curry5<T1, T2, T3, T4, T5, R>(func: Func5<T1, T2, T3, T4, T5, R>): CurriedFunc5<T1, T2, T3, T4, T5, R>{
  return a1 => a2 => a3 => a4 => a5 => func(a1, a2, a3, a4, a5);
}
export function curry6<T1, T2, T3, T4, T5, T6, R>(func: Func6<T1, T2, T3, T4, T5, T6, R>): CurriedFunc6<T1, T2, T3, T4, T5, T6, R>{
  return a1 => a2 => a3 => a4 => a5 => a6 => func(a1, a2, a3, a4, a5, a6);
}
export function curry7<T1, T2, T3, T4, T5, T6, T7, R>(func: Func7<T1, T2, T3, T4, T5, T6, T7, R>): CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R>{
  return a1 => a2 => a3 => a4 => a5 => a6 => a7 => func(a1, a2, a3, a4, a5, a6, a7);
}
export function curry8<T1, T2, T3, T4, T5, T6, T7, T8, R>(func: Func8<T1, T2, T3, T4, T5, T6, T7, T8, R>): CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R>{
  return a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => func(a1, a2, a3, a4, a5, a6, a7, a8);
}

