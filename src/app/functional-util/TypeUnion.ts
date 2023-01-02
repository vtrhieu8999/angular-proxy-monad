export type TypeUnion<T, R> = {readonly tag: T, result: R};
export type ExtractUnion<T> = T extends TypeUnion<Octa, infer U>? U : never;
export type Octa =
  |typeof First
  |typeof Second
  |typeof Third
  |typeof Fourth
  |typeof Fifth
  |typeof Sixth
  |typeof Seventh
  |typeof Eighth;
export const First = Symbol('First');
export type First<T> = TypeUnion<typeof First, T>;
export function toFirst<T>(value: T): First<T>{return {tag: First, result: value};}
export const Second = Symbol('Second');
export type Second<T> = TypeUnion<typeof Second, T>;
export function toSecond<T>(value: T): Second<T>{return {tag: Second, result: value};}
export const Third = Symbol('Third');
export type Third<T> = TypeUnion<typeof Third, T>;
export function toThird<T>(value: T): Third<T>{return {tag: Third, result: value};}
export const Fourth = Symbol('Fourth');
export type Fourth<T> = TypeUnion<typeof Fourth, T>;
export function toFourth<T>(value: T): Fourth<T>{return {tag: Fourth, result: value};}
export const Fifth = Symbol('Fifth');
export type Fifth<T> = TypeUnion<typeof Fifth, T>;
export function toFifth<T>(value: T): Fifth<T>{return {tag: Fifth, result: value};}
export const Sixth = Symbol('Sixth');
export type Sixth<T> = TypeUnion<typeof Sixth, T>;
export function toSixth<T>(value: T): Sixth<T>{return {tag: Sixth, result: value};}
export const Seventh = Symbol('Seventh');
export type Seventh<T> = TypeUnion<typeof Seventh, T>;
export function toSeventh<T>(value: T): Seventh<T>{return {tag: Seventh, result: value};}
export const Eighth = Symbol('Eighth');
export type Eighth<T> = TypeUnion<typeof Eighth, T>;
export function toEighth<T>(value: T): Eighth<T>{return {tag: Eighth, result: value};}

export type Three<T1, T2, T3> = First<T1> | Second<T2> | Third<T3>;
export type Four<T1, T2, T3, T4> = Three<T1, T2, T3> | Fourth<T4>;
export type Five<T1, T2, T3, T4, T5> = Four<T1, T2, T3, T4> | Fifth<T5>;
export type Six<T1, T2, T3, T4, T5, T6> = Five<T1, T2, T3, T4, T5> | Sixth<T6>;
export type Seven<T1, T2, T3, T4, T5, T6, T7> = Six<T1, T2, T3, T4, T5, T6> | Seventh<T7>;
export type Eight<T1, T2, T3, T4, T5, T6, T7, T8> = Seven<T1, T2, T3, T4, T5, T6, T7> | Eighth<T8>;
