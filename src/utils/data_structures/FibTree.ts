/**
 * TODO:
 * build a BinaryTree DS and
 * copy Tree.ts
 */

export class Node {
  key: any;
  value: any;
  parent: null;
  left: null;
  right: null;

  constructor(key: any, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

export class FibTree {
  root: Node;

  constructor(key: any, value = key) {
    this.root = new Node(key, value, null);
  }

  *preOrderTraversal(node = this.root): any {
    yield node;

    if (node.left) {
      yield* this.preOrderTraversal(node.left);
    }
    if (node.right) {
      yield* this.preOrderTraversal(node.right);
    }
  }

  insertTest(v: any) {
    console.log(v)
  }

  /**
   * figure out how to build Tree DS
   * 
   * @param parentNodeKey 
   * @param leftKey 
   * @param rightKey 
   * @returns 
   */
  insert(parent: any, left: any, right: any) {
    //console.log(parent, left, right)

    for (const node of this.preOrderTraversal()) {
      //console.log(node)
      if (node.key === parent) {
        node.left = new Node(left, null, parent);
        node.right = new Node(right, null, parent);
        return true;
      }
    }
  }

  find(key: any) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}
