import {Comparator, Consumer, Func, Func2, Runnable} from "./JavaFunctionalInterfaceType";
import {MaybeProxy} from "./Maybe";
import {Try} from "./Try";

export type TryMaybeProxy<T> = MaybeProxy<Try<T>>;
export type PromiseProxy<T> = Proxy<Promise<T>>;

export function flatMapPromiseProxy<T, R>(promiseProxy: PromiseProxy<T>,
                                          flatMapper: Func<T, PromiseProxy<R>>): PromiseProxy<R> {
  return new PromiseNested(flatMapper, promiseProxy);
}

export abstract class Proxy<T> {
  protected dependencies: Runnable[] = [];

  abstract get(): T;

  detach!: () => void;

  clone(): Proxy<T> {
    return this.map(t => t);
  }

  map<R>(mapper: Func<T, R>): Proxy<R> {
    return new Target(mapper, this);
  }

  ap<R>(applier: Proxy<Func<T, R>>): Proxy<R> {
    return this.flatMap(t => applier.map(func => func(t)));
  }

  flatMap<R>(flatMapper: Func<T, Proxy<R>>): Proxy<R> {
    return new Nested(flatMapper, this);
  }

  detachDependency(notifier: Runnable): void {
    this.dependencies = this.dependencies.filter(value => value !== notifier);
  }

  binding(changeNotifiers: Runnable[]): void {
    this.dependencies = this.dependencies.concat(changeNotifiers);
  }

  changeNotifying: Runnable = (): void => {
    this.dependencies.forEach(notifier => notifier());
  }
}

export abstract class Src<T> extends Proxy<T> {
  abstract set(value: T): void;

  abstract isEqual(value: T): boolean;

  override clone(): Src<T> {
    return this.mapToSrc(t => t, (t1, t2) => t2);
  }

  mapToSrc<R>(mapper: Func<T, R>,
              reducer: Func2<T, R, T>,
              comparator?: Comparator<R>): Src<R> {
    return new MutableTarget(mapper, this, reducer, comparator);
  }

  flatMapSrc<R>(flatMapper: Func<T, Src<R>>,
                reducer: Func2<T, R, T>): Src<R> {
    return new MutableNested(flatMapper, this, reducer);
  }

  static from<T>(value: T,
                 comparator?: Comparator<T>,
                 reflectChange?: Consumer<T>): Src<T> {
    return new EntryPoint(value, comparator, reflectChange);
  }
}

const LAZY_PLACE_HOLDER = Symbol('LAZY_PLACE_HOLDER');

class Target<S, T> extends Proxy<T> {
  private cachedData: T | typeof LAZY_PLACE_HOLDER = LAZY_PLACE_HOLDER;

  constructor(private readonly statement: Func<S, T>,
              private readonly derivedFrom: Proxy<S>) {
    super();
    const changeNotifier: Runnable = this.changeNotifying;
    this.changeNotifying = (): void => {
      if (this.cachedData === LAZY_PLACE_HOLDER) return;
      changeNotifier();
      this.cachedData = LAZY_PLACE_HOLDER;
    };
    this.derivedFrom.binding([this.changeNotifying]);
  }

  get(): T {
    if (this.cachedData === LAZY_PLACE_HOLDER)
      this.cachedData = this.statement(this.derivedFrom.get());
    return this.cachedData;
  }

  override detach = (): void => {
    this.derivedFrom.detachDependency(this.changeNotifying);
  }
}

class Nested<S, T> extends Proxy<T> {
  private cachedData: Proxy<T> | typeof LAZY_PLACE_HOLDER = LAZY_PLACE_HOLDER;

  constructor(private readonly statement: Func<S, Proxy<T>>,
              private readonly derivedFrom: Proxy<S>) {
    super();
    const changeNotifier: Runnable = this.changeNotifying;
    this.changeNotifying = (): void => {
      if (this.cachedData === LAZY_PLACE_HOLDER) return;
      changeNotifier();
      this.cachedData.detach();
      this.cachedData = LAZY_PLACE_HOLDER;
    };
    this.derivedFrom.binding([this.changeNotifying]);
  }

  override binding(changeNotifiers: Runnable[]): void {
    super.binding(changeNotifiers);
    if (this.cachedData !== LAZY_PLACE_HOLDER)
      this.cachedData.binding(changeNotifiers);
  }

  override detach = (): void => {
    this.derivedFrom.detachDependency(this.changeNotifying);
    if (this.cachedData !== LAZY_PLACE_HOLDER) this.cachedData.detach();
  }

  get(): T {
    if (this.cachedData === LAZY_PLACE_HOLDER) {
      this.cachedData = this.statement(this.derivedFrom.get());
      this.cachedData.binding(this.dependencies);
    }
    return this.cachedData.get();
  }
}

class PromiseNested<S, T> extends Proxy<Promise<T>> {
  private cachedData: PromiseProxy<T> | typeof LAZY_PLACE_HOLDER = LAZY_PLACE_HOLDER;

  constructor(private readonly statement: Func<S, PromiseProxy<T>>,
              private readonly derivedFrom: PromiseProxy<S>) {
    super();
    const changeNotifier: Runnable = this.changeNotifying;
    this.changeNotifying = (): void => {
      if (this.cachedData === LAZY_PLACE_HOLDER) return;
      changeNotifier();
      this.cachedData.detach();
      this.cachedData = LAZY_PLACE_HOLDER;
    }
    this.derivedFrom.binding([this.changeNotifying]);
  }

  async get(): Promise<T> {
    if (this.cachedData === LAZY_PLACE_HOLDER) {
      this.cachedData = this.statement(await this.derivedFrom.get());
      this.cachedData.binding(this.dependencies);
    }
    return this.cachedData.get();
  }

  override binding(changeNotifiers: Runnable[]): void {
    super.binding(changeNotifiers);
    if (this.cachedData !== LAZY_PLACE_HOLDER)
      this.cachedData.binding(changeNotifiers);
  }

  override detach = (): void => {
    this.derivedFrom.detachDependency(this.changeNotifying);
    if (this.cachedData !== LAZY_PLACE_HOLDER) this.cachedData.detach();
  }
}

class EntryPoint<T> extends Src<T> {
  constructor(private value: T,
              private readonly comparator?: Comparator<T>,
              private reflectChange?: Consumer<T>) {
    super();
  }

  override detach = (): void => {
    this.reflectChange = undefined;
  }

  isEqual(value: T): boolean {
    return this.comparator === undefined ?
      false : this.comparator(value, this.value);
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    if (this.isEqual(value)) return;
    this.value = value;
    this.reflectChange?.(value);
    this.changeNotifying();
  }
}

class MutableTarget<S, T> extends Src<T> {
  private cachedData: T | typeof LAZY_PLACE_HOLDER = LAZY_PLACE_HOLDER;

  constructor(private readonly statement: Func<S, T>,
              private readonly derivedFrom: Src<S>,
              private readonly reducer: Func2<S, T, S>,
              private readonly comparator?: Comparator<T>) {
    super();
    const changeNotifier = this.changeNotifying;
    this.changeNotifying = (): void => {
      if (this.cachedData === LAZY_PLACE_HOLDER) return;
      changeNotifier();
      this.cachedData = LAZY_PLACE_HOLDER;
    };
    this.derivedFrom.binding([this.changeNotifying]);
  }

  get(): T {
    if (this.cachedData === LAZY_PLACE_HOLDER)
      this.cachedData = this.statement(this.derivedFrom.get());
    return this.cachedData;
  }

  set(value: T): void {
    if (this.isEqual(value)) return;
    this.derivedFrom.set(this.reducer(this.derivedFrom.get(), value));
  }

  isEqual(value: T): boolean {
    return this.cachedData !== LAZY_PLACE_HOLDER
      && (this.comparator === undefined ? false :
        this.comparator(value, this.cachedData));
  }

  override detach = (): void => {
    this.derivedFrom.detachDependency(this.changeNotifying);
  }
}

class MutableNested<S, T> extends Src<T> {
  private cachedData: Src<T> | typeof LAZY_PLACE_HOLDER = LAZY_PLACE_HOLDER;

  constructor(private readonly statement: Func<S, Src<T>>,
              private readonly derivedFrom: Src<S>,
              private readonly reducer: Func2<S, T, S>) {
    super();
    const changeNotifier = this.changeNotifying;
    this.changeNotifying = (): void => {
      if (this.cachedData === LAZY_PLACE_HOLDER) return;
      changeNotifier();
      this.cachedData.detach();
      this.cachedData = LAZY_PLACE_HOLDER;
    };
    this.derivedFrom.binding([this.changeNotifying.bind(this)]);
  }

  get(): T {
    if (this.cachedData === LAZY_PLACE_HOLDER) {
      this.cachedData = this.statement(this.derivedFrom.get());
      this.cachedData.binding(this.dependencies);
    }
    return this.cachedData.get();
  }

  set(value: T): void {
    if (this.cachedData === LAZY_PLACE_HOLDER)
      this.cachedData = this.statement(this.derivedFrom.get());
    if (this.cachedData.isEqual(value)) return;
    this.cachedData.set(value);
    this.derivedFrom.set(this.reducer(this.derivedFrom.get(), value));
  }

  isEqual(value: T): boolean {
    return this.cachedData === LAZY_PLACE_HOLDER ?
      false : this.cachedData.isEqual(value);
  }

  override binding(changeNotifiers: Runnable[]): void {
    super.binding(changeNotifiers);
    if (this.cachedData !== LAZY_PLACE_HOLDER)
      this.cachedData.binding(changeNotifiers);
  }

  override detach = (): void => {
    this.derivedFrom.detachDependency(this.changeNotifying);
    if (this.cachedData !== LAZY_PLACE_HOLDER) this.cachedData.detach();
  }
}
