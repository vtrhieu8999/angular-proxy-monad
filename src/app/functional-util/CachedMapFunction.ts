import {Func, Predicate, TriConsumer} from "./JavaFunctionalInterfaceType";

export class CachedMapFunction<K, V> {
  private internalMap: Map<K, V>;

  constructor(private mapper: Func<K, V>, keys?: K[]) {
    this.internalMap = new Map<K, V>(keys?.map(key => [key, mapper(key)]));
  }

  set(key: K): CachedMapFunction<K, V> {
    this.internalMap.set(key, this.mapper(key));
    return this;
  }

  delete(key: K): boolean {
    return this.internalMap.delete(key);
  }

  forEach(callbackfn: TriConsumer<V, K, ReadonlyMap<K, V>>, thisArg?: any): void {
    this.internalMap.forEach(callbackfn, thisArg);
  }

  get(key: K): V | undefined {
    return this.internalMap.get(key);
  }

  find(predicate: Predicate<K>): V | undefined {
    for (let entry of this.entries()) {
      if (predicate(entry[0]))
        return entry[1];
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  entries(): IterableIterator<[K, V]> {
    return this.internalMap.entries();
  }

  keys(): IterableIterator<K> {
    return this.internalMap.keys();
  }

  values(): IterableIterator<V> {
    return this.internalMap.values();
  }
}

