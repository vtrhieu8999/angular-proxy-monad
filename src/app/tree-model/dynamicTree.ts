import {Proxy, Src} from "../functional-util/Proxy";
import {Comparator, Consumer, Func, Predicate} from "../functional-util/JavaFunctionalInterfaceType";
import {zipMap2Proxy} from "../functional-util/ZipMap";

export interface DynamicTree<N, K> {
  root: N,
  children: Proxy<DynamicTree<N, K>[]>
}

const CONSUMER_THAT_DO_NOTHING: Consumer<any> = t => {};
const PROXY_CONTAIN_CONSUMER_THAT_DO_NOTHING: Proxy<Consumer<any>> = Src.from(CONSUMER_THAT_DO_NOTHING);

export function buildDynamicTree<N, K>(nodes: Proxy<N[]>,
                                       keyMapper: Func<N, Proxy<K>>,
                                       parentKeyMapper: Func<N, Proxy<K>>,
                                       keyComparator: Comparator<K>): Proxy<DynamicTree<N, K>[]> {
  return nodes.map(
    arr => initChildren(
      arr.map(currentNode => <DynamicTree<N, K>>{root: currentNode}),
      keyMapper, parentKeyMapper, keyComparator
    )
  ).flatMap(
    arr => filterProxy(arr,
      currentNode => zipMap2Proxy(
        parentKeyMapper(currentNode.root), keyMapper(currentNode.root),
        parentKey => key => keyComparator(parentKey, key)
      )
    )
  );
}

function initChildren<N, K>(arr: DynamicTree<N, K>[],
                            keyMapper: Func<N, Proxy<K>>,
                            parentKeyMapper: Func<N, Proxy<K>>,
                            keyComparator: Comparator<K>): DynamicTree<N, K>[] {
  arr.forEach(currentNode =>
    currentNode.children = filterProxy(arr,
      currentChild => zipMap2Proxy(
        parentKeyMapper(currentChild.root),
        keyMapper(currentNode.root),
        childKey => currentKey => currentNode !== currentChild && keyComparator(childKey, currentKey)
      )
    )
  );
  return arr;
}

function filterProxy<T>(arr: T[], predicate: Func<T, Proxy<boolean>>): Proxy<T[]> {
  return arr.map<Proxy<Consumer<T[]>>>(
    instance => predicate(instance).map(
      bool => bool ?
        tArr => tArr.push(instance)
        : CONSUMER_THAT_DO_NOTHING
    )
  ).reduce(proxyOfConsumerCombinator, PROXY_CONTAIN_CONSUMER_THAT_DO_NOTHING
  ).map(constructArray);
}

function filterProxyArray<T>(arr: Proxy<T>[], predicate: Predicate<T>): Proxy<T[]> {
  return arr.map<Proxy<Consumer<T[]>>>(
    proxyInstance => proxyInstance.map(
      instance => predicate(instance) ?
        tArr => tArr.push(instance)
        : CONSUMER_THAT_DO_NOTHING
    )
  ).reduce(proxyOfConsumerCombinator, PROXY_CONTAIN_CONSUMER_THAT_DO_NOTHING
  ).map(constructArray);
}

function constructArray<T>(mutator: Consumer<T[]>): T[] {
  const tArr: T[] = [];
  mutator(tArr);
  return tArr;
}

function proxyOfConsumerCombinator<T>(mut1: Proxy<Consumer<T>>, mut2: Proxy<Consumer<T>>): Proxy<Consumer<T>> {
  return zipMap2Proxy(mut1, mut2,
    consumer1 => consumer2 => consumeArr => {
      consumer1(consumeArr);
      consumer2(consumeArr);
    }
  );
}
