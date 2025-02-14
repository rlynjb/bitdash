/**
 * TODO:
 * build a BinaryTree DS and
 * copy Tree.ts
 */

class Node {
  key: any;
  left: null;
  right: null;

  constructor(key: any) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class FibTree2 {
  root: Node;
  stack: any[];

  constructor(key: any) {
    this.root = new Node(key);
    this.stack = [key];
  }

  insertLeftSubtree(parentKey: number, left: number, right: number) {
    const helper = (node: any, leftkey: any, rightkey: any) => {
      if (node.left === null) {
        node.left = new Node(leftkey);
        node.right = new Node(rightkey)
      } else {
        helper(node.left, leftkey, rightkey);
      }
    }
    helper(this.root, left, right);
  }

  insertRightSubtree(key: number, left: number, right: number) {
    const helper = (node: any, leftkey: any, rightkey: any) => {
      if (node.right === null) {
        node.left = new Node(leftkey);
        node.right = new Node(rightkey)
      } else {
        helper(node.right, leftkey, rightkey);
      }
    }
    helper(this.root, left, right);
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

  find(key: any) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  insert(key: any) {
    console.log('insertLeft', key)
    const traverseLeft = (node: any): any => {
      if (node.key === key) return;
      if (node.left === null) {
        this.stack.push(key);
        node.left = new Node(key);
      } else {
        traverseLeft(node.left);
      }

      if (this.stack.length === 1) { // this mean we are back to root
        // now process, right subtree
        this.stack.push(key);
        console.log('bbbb', this.stack)
      }
    }
    traverseLeft(this.root)
  }

  insertLeafRight(key: any, left: any, right: any) {
    console.log('insertLeafRight', key, left, right)
    const currentKey = this.stack.pop();
    console.log('pop', currentKey, 'state of stack', this.stack)

    const currentNode = this.find(currentKey);
    let dupNode = null;

    console.log('currentNode', currentNode)
    if (currentNode && currentNode.left && currentNode.right) {
      console.log('DUPLICATE')
      dupNode = currentNode;
    }
    if (currentNode && currentNode.left === null) {
      currentNode.left = new Node(left);
    }
    if (currentNode && currentNode.right === null) {
      currentNode.right = new Node(right);
    }

    /*
    if (this.stack.length === 0 && currentNode) {
      console.log('process right subtree')
      currentNode.right = new Node(key)
    }*/
    
  }
}
