/**
 * Look into proper way to implement Tree Data Structure / Node
 * ref: https://www.freecodecamp.org/news/all-you-need-to-know-about-tree-data-structures-bceacb85490c/
 * https://www.30secondsofcode.org/js/s/data-structures-tree/
 * 
 * BUILT SOMETHING SIMPLE FOR NOW.. just to make it work
 */

export class TreeNode {
  key: any;
  value: any;
  parent: null;
  children: never[];

  constructor(key: any, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

export class Tree {
  root: TreeNode;

  constructor(key: any, value = key) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root): any {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root): any {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey: any, key: any, value = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key: any) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter(c => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key: any) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}