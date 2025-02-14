/* eslint-disable @typescript-eslint/no-explicit-any */

class BSTNode {
  key: any;
  left: any;
  right: any;

  constructor(key: any) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: any;

  constructor() {
    this.root = null;
  }

  insert(key: any) {
    if (key === "" || key === null || key === undefined) return;

    if (this.root === null) {
      this.root = new BSTNode(key)
      return this.root;
    }

    const insertNode = (currentNode: any, newValue: any) => {
      if (newValue < currentNode.key) {
        if (currentNode.left === null) {
          currentNode.left = new BSTNode(newValue)
        } else {
          insertNode(currentNode.left, newValue)
        }
        
      } else {
        if (currentNode.right === null) {
          currentNode.right = new BSTNode(newValue)
        } else {
          insertNode(currentNode.right, newValue)
        }
      }
    }

    insertNode(this.root, key);
  }
}