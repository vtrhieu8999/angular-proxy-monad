import {
  CurriedFunc2, CurriedFunc3, CurriedFunc4, CurriedFunc5, CurriedFunc6, CurriedFunc7, CurriedFunc8
} from "./JavaFunctionalInterfaceType";
import {Proxy, TryMaybeProxy} from "./Proxy";
import {apMaybeProxy, mapMaybeProxy, MaybeProxy} from "./Maybe";
import {apTryProxy, apTryMaybeProxy, mapTryProxy, mapTryMaybeProxy, TryProxy} from "./Try";

export function zipMap2Proxy<T1, T2, R>(arg1: Proxy<T1>,
                                        arg2: Proxy<T2>,
                                        func: CurriedFunc2<T1, T2, R>): Proxy<R> {
  return arg2.ap(arg1.map(func));
}

export function zipMap2MaybeProxy<T1, T2, R>(arg1: MaybeProxy<T1>,
                                             arg2: MaybeProxy<T2>,
                                             func: CurriedFunc2<T1, T2, R>): MaybeProxy<R> {
  return apMaybeProxy(arg2, mapMaybeProxy(arg1, func));
}

export function zipMap2TryProxy<T1, T2, R>(arg1: TryProxy<T1>,
                                           arg2: TryProxy<T2>,
                                           func: CurriedFunc2<T1, T2, R>): TryProxy<R> {
  return apTryProxy(arg2, mapTryProxy(arg1, func));
}

export function zipMap2TryMaybeProxy<T1, T2, R>(arg1: TryMaybeProxy<T1>,
                                                arg2: TryMaybeProxy<T2>,
                                                func: CurriedFunc2<T1, T2, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg2, mapTryMaybeProxy(arg1, func));
}

export function zipMap3Proxy<T1, T2, T3, R>(arg1: Proxy<T1>,
                                            arg2: Proxy<T2>,
                                            arg3: Proxy<T3>,
                                            func: CurriedFunc3<T1, T2, T3, R>): Proxy<R> {
  return arg3.ap(zipMap2Proxy(arg1,arg2,func));
}

export function zipMap3TryProxy<T1, T2, T3, R>(arg1: TryProxy<T1>,
                                               arg2: TryProxy<T2>,
                                               arg3: TryProxy<T3>,
                                               func: CurriedFunc3<T1, T2, T3, R>): TryProxy<R> {
  return apTryProxy(arg3, zipMap2TryProxy(arg1,arg2,func));
}

export function zipMap3MaybeProxy<T1, T2, T3, R>(arg1: MaybeProxy<T1>,
                                                 arg2: MaybeProxy<T2>,
                                                 arg3: MaybeProxy<T3>,
                                                 func: CurriedFunc3<T1, T2, T3, R>): MaybeProxy<R> {
  return apMaybeProxy(arg3, zipMap2MaybeProxy(arg1,arg2,func));
}

export function zipMap3TryMaybeProxy<T1, T2, T3, R>(arg1: TryMaybeProxy<T1>,
                                                    arg2: TryMaybeProxy<T2>,
                                                    arg3: TryMaybeProxy<T3>,
                                                    func: CurriedFunc3<T1, T2, T3, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg3, zipMap2TryMaybeProxy(arg1,arg2,func));
}

export function zipMap4Proxy<T1, T2, T3, T4, R>(arg1: Proxy<T1>,
                                                arg2: Proxy<T2>,
                                                arg3: Proxy<T3>,
                                                arg4: Proxy<T4>,
                                                func: CurriedFunc4<T1, T2, T3, T4, R>): Proxy<R> {
  return arg4.ap(zipMap3Proxy(arg1,arg2,arg3,func));
}

export function zipMap4TryProxy<T1, T2, T3, T4, R>(arg1: TryProxy<T1>,
                                                   arg2: TryProxy<T2>,
                                                   arg3: TryProxy<T3>,
                                                   arg4: TryProxy<T4>,
                                                   func: CurriedFunc4<T1, T2, T3, T4, R>): TryProxy<R> {
  return apTryProxy(arg4, zipMap3TryProxy(arg1,arg2,arg3,func));
}

export function zipMap4MaybeProxy<T1, T2, T3, T4, R>(arg1: MaybeProxy<T1>,
                                                     arg2: MaybeProxy<T2>,
                                                     arg3: MaybeProxy<T3>,
                                                     arg4: MaybeProxy<T4>,
                                                     func: CurriedFunc4<T1, T2, T3, T4, R>): MaybeProxy<R> {
  return apMaybeProxy(arg4, zipMap3MaybeProxy(arg1,arg2,arg3,func));
}

export function zipMap4TryMaybeProxy<T1, T2, T3, T4, R>(arg1: TryMaybeProxy<T1>,
                                                        arg2: TryMaybeProxy<T2>,
                                                        arg3: TryMaybeProxy<T3>,
                                                        arg4: TryMaybeProxy<T4>,
                                                        func: CurriedFunc4<T1, T2, T3, T4, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg4, zipMap3TryMaybeProxy(arg1,arg2,arg3,func));
}

export function zipMap5Proxy<T1, T2, T3, T4, T5, R>(arg1: Proxy<T1>,
                                                    arg2: Proxy<T2>,
                                                    arg3: Proxy<T3>,
                                                    arg4: Proxy<T4>,
                                                    arg5: Proxy<T5>,
                                                    func: CurriedFunc5<T1, T2, T3, T4, T5, R>): Proxy<R> {
  return arg5.ap(zipMap4Proxy(arg1,arg2,arg3,arg4,func));
}

export function zipMap5TryProxy<T1, T2, T3, T4, T5, R>(arg1: TryProxy<T1>,
                                                       arg2: TryProxy<T2>,
                                                       arg3: TryProxy<T3>,
                                                       arg4: TryProxy<T4>,
                                                       arg5: TryProxy<T5>,
                                                       func: CurriedFunc5<T1, T2, T3, T4, T5, R>): TryProxy<R> {
  return apTryProxy(arg5, zipMap4TryProxy(arg1,arg2,arg3,arg4,func));
}

export function zipMap5MaybeProxy<T1, T2, T3, T4, T5, R>(arg1: MaybeProxy<T1>,
                                                         arg2: MaybeProxy<T2>,
                                                         arg3: MaybeProxy<T3>,
                                                         arg4: MaybeProxy<T4>,
                                                         arg5: MaybeProxy<T5>,
                                                         func: CurriedFunc5<T1, T2, T3, T4, T5, R>): MaybeProxy<R> {
  return apMaybeProxy(arg5, zipMap4MaybeProxy(arg1,arg2,arg3,arg4,func));
}

export function zipMap5TryMaybeProxy<T1, T2, T3, T4, T5, R>(arg1: TryMaybeProxy<T1>,
                                                            arg2: TryMaybeProxy<T2>,
                                                            arg3: TryMaybeProxy<T3>,
                                                            arg4: TryMaybeProxy<T4>,
                                                            arg5: TryMaybeProxy<T5>,
                                                            func: CurriedFunc5<T1, T2, T3, T4, T5, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg5, zipMap4TryMaybeProxy(arg1,arg2,arg3,arg4,func));
}

export function zipMap6Proxy<T1, T2, T3, T4, T5, T6, R>(arg1: Proxy<T1>,
                                                        arg2: Proxy<T2>,
                                                        arg3: Proxy<T3>,
                                                        arg4: Proxy<T4>,
                                                        arg5: Proxy<T5>,
                                                        arg6: Proxy<T6>,
                                                        func: CurriedFunc6<T1, T2, T3, T4, T5, T6, R>): Proxy<R> {
  return arg6.ap(zipMap5Proxy(arg1,arg2,arg3,arg4,arg5,func));
}

export function zipMap6TryProxy<T1, T2, T3, T4, T5, T6, R>(arg1: TryProxy<T1>,
                                                           arg2: TryProxy<T2>,
                                                           arg3: TryProxy<T3>,
                                                           arg4: TryProxy<T4>,
                                                           arg5: TryProxy<T5>,
                                                           arg6: TryProxy<T6>,
                                                           func: CurriedFunc6<T1, T2, T3, T4, T5, T6, R>): TryProxy<R> {
  return apTryProxy(arg6, zipMap5TryProxy(arg1,arg2,arg3,arg4,arg5,func));
}

export function zipMap6MaybeProxy<T1, T2, T3, T4, T5, T6, R>(arg1: MaybeProxy<T1>,
                                                             arg2: MaybeProxy<T2>,
                                                             arg3: MaybeProxy<T3>,
                                                             arg4: MaybeProxy<T4>,
                                                             arg5: MaybeProxy<T5>,
                                                             arg6: MaybeProxy<T6>,
                                                             func: CurriedFunc6<T1, T2, T3, T4, T5, T6, R>): MaybeProxy<R> {
  return apMaybeProxy(arg6, zipMap5MaybeProxy(arg1,arg2,arg3,arg4,arg5,func));
}

export function zipMap6TryMaybeProxy<T1, T2, T3, T4, T5, T6, R>(arg1: TryMaybeProxy<T1>,
                                                                arg2: TryMaybeProxy<T2>,
                                                                arg3: TryMaybeProxy<T3>,
                                                                arg4: TryMaybeProxy<T4>,
                                                                arg5: TryMaybeProxy<T5>,
                                                                arg6: TryMaybeProxy<T6>,
                                                                func: CurriedFunc6<T1, T2, T3, T4, T5, T6, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg6, zipMap5TryMaybeProxy(arg1,arg2,arg3,arg4,arg5,func));
}

export function zipMap7Proxy<T1, T2, T3, T4, T5, T6, T7, R>(arg1: Proxy<T1>,
                                                            arg2: Proxy<T2>,
                                                            arg3: Proxy<T3>,
                                                            arg4: Proxy<T4>,
                                                            arg5: Proxy<T5>,
                                                            arg6: Proxy<T6>,
                                                            arg7: Proxy<T7>,
                                                            func: CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R>): Proxy<R> {
  return arg7.ap(zipMap6Proxy(arg1,arg2,arg3,arg4,arg5,arg6,func));
}

export function zipMap7TryProxy<T1, T2, T3, T4, T5, T6, T7, R>(arg1: TryProxy<T1>,
                                                               arg2: TryProxy<T2>,
                                                               arg3: TryProxy<T3>,
                                                               arg4: TryProxy<T4>,
                                                               arg5: TryProxy<T5>,
                                                               arg6: TryProxy<T6>,
                                                               arg7: TryProxy<T7>,
                                                               func: CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R>): TryProxy<R> {
  return apTryProxy(arg7, zipMap6TryProxy(arg1,arg2,arg3,arg4,arg5,arg6,func));
}

export function zipMap7MaybeProxy<T1, T2, T3, T4, T5, T6, T7, R>(arg1: MaybeProxy<T1>,
                                                                 arg2: MaybeProxy<T2>,
                                                                 arg3: MaybeProxy<T3>,
                                                                 arg4: MaybeProxy<T4>,
                                                                 arg5: MaybeProxy<T5>,
                                                                 arg6: MaybeProxy<T6>,
                                                                 arg7: MaybeProxy<T7>,
                                                                 func: CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R>): MaybeProxy<R> {
  return apMaybeProxy(arg7, zipMap6MaybeProxy(arg1,arg2,arg3,arg4,arg5,arg6,func));
}

export function zipMap7TryMaybeProxy<T1, T2, T3, T4, T5, T6, T7, R>(arg1: TryMaybeProxy<T1>,
                                                                    arg2: TryMaybeProxy<T2>,
                                                                    arg3: TryMaybeProxy<T3>,
                                                                    arg4: TryMaybeProxy<T4>,
                                                                    arg5: TryMaybeProxy<T5>,
                                                                    arg6: TryMaybeProxy<T6>,
                                                                    arg7: TryMaybeProxy<T7>,
                                                                    func: CurriedFunc7<T1, T2, T3, T4, T5, T6, T7, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg7, zipMap6TryMaybeProxy(arg1,arg2,arg3,arg4,arg5,arg6,func));
}

export function zipMap8Proxy<T1, T2, T3, T4, T5, T6, T7, T8, R>(arg1: Proxy<T1>,
                                                                arg2: Proxy<T2>,
                                                                arg3: Proxy<T3>,
                                                                arg4: Proxy<T4>,
                                                                arg5: Proxy<T5>,
                                                                arg6: Proxy<T6>,
                                                                arg7: Proxy<T7>,
                                                                arg8: Proxy<T8>,
                                                                func: CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R>): Proxy<R> {
  return arg8.ap(zipMap7Proxy(arg1,arg2,arg3,arg4,arg5,arg6,arg7,func));
}

export function zipMap8TryProxy<T1, T2, T3, T4, T5, T6, T7, T8, R>(arg1: TryProxy<T1>,
                                                                   arg2: TryProxy<T2>,
                                                                   arg3: TryProxy<T3>,
                                                                   arg4: TryProxy<T4>,
                                                                   arg5: TryProxy<T5>,
                                                                   arg6: TryProxy<T6>,
                                                                   arg7: TryProxy<T7>,
                                                                   arg8: TryProxy<T8>,
                                                                   func: CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R>): TryProxy<R> {
  return apTryProxy(arg8, zipMap7TryProxy(arg1,arg2,arg3,arg4,arg5,arg6,arg7,func));
}

export function zipMap8MaybeProxy<T1, T2, T3, T4, T5, T6, T7, T8, R>(arg1: MaybeProxy<T1>,
                                                                     arg2: MaybeProxy<T2>,
                                                                     arg3: MaybeProxy<T3>,
                                                                     arg4: MaybeProxy<T4>,
                                                                     arg5: MaybeProxy<T5>,
                                                                     arg6: MaybeProxy<T6>,
                                                                     arg7: MaybeProxy<T7>,
                                                                     arg8: MaybeProxy<T8>,
                                                                     func: CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R>): MaybeProxy<R> {
  return apMaybeProxy(arg8, zipMap7MaybeProxy(arg1,arg2,arg3,arg4,arg5,arg6,arg7,func));
}

export function zipMap8TryMaybeProxy<T1, T2, T3, T4, T5, T6, T7, T8, R>(arg1: TryMaybeProxy<T1>,
                                                                        arg2: TryMaybeProxy<T2>,
                                                                        arg3: TryMaybeProxy<T3>,
                                                                        arg4: TryMaybeProxy<T4>,
                                                                        arg5: TryMaybeProxy<T5>,
                                                                        arg6: TryMaybeProxy<T6>,
                                                                        arg7: TryMaybeProxy<T7>,
                                                                        arg8: TryMaybeProxy<T8>,
                                                                        func: CurriedFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R>): TryMaybeProxy<R> {
  return apTryMaybeProxy(arg8, zipMap7TryMaybeProxy(arg1,arg2,arg3,arg4,arg5,arg6,arg7,func));
}
