import {Comparator, Func, Predicate} from "../functional-util/JavaFunctionalInterfaceType";

export interface Tree<T, K> {
  nodeKey: () => K,
  node: T,
  parentKey: () => K,
  children: Tree<T, K>[]
}

export function buildTree<T, K>(nodes: T[],
                                keyGetter: Func<T, K>,
                                parentKeyGetter: Func<T, K>,
                                keyComparator: Comparator<K>): Tree<T, K>[] {
  const initList = separateList(nodes.map(
      currentNode => <Tree<T, K>>{
        nodeKey: () => keyGetter(currentNode),
        node: currentNode,
        parentKey: () => parentKeyGetter(currentNode)
      }
    ), tree => keyComparator(tree.nodeKey(), tree.parentKey())
  );
  fillChildren(initList[1], initList[0], keyComparator);
  return initList[1];
}

function fillChildren<T, K>(currentList: Tree<T, K>[],
                            remainList: Tree<T, K>[],
                            keyComparator: Comparator<K>): Tree<T, K>[] {
  for (const currentNode of currentList) {
    const separatedList = separateList(remainList,
      remainChildren => keyComparator(currentNode.nodeKey(), remainChildren.parentKey())
    );
    currentNode.children = separatedList[1];
    remainList = fillChildren(
      currentNode.children,
      separatedList[0],
      keyComparator
    );
  }
  return remainList;
}

function separateList<T>(list: T[], predicate: Predicate<T>): [T[], T[]] {
  const leftList: T[] = [];
  const rightList: T[] = [];
  for (const current of list) {
    if (predicate(current)) rightList.push(current);
    else leftList.push(current);
  }
  return [leftList, rightList];
}
