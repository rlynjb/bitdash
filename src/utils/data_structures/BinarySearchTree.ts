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

  max() {
    if (this.root === null) return null;

    let currentNode = this.root;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode.key;
  }

  // if node exist, return node as obj
  // else return key as string
  min(node?: any) {
    if (this.root === null) return null;

    let currentNode = node ? node : this.root;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return node ? currentNode : currentNode.key;
  }

  delete(node_to_be_deleted_value: any) {
    // edge case, nothing to process
    if (this.root === null) return this.root;

    /**
     * search for node to be deleted
     * by using Recursive linear traversal
     */
    const deleteNode = (root: any, key: any) => {
      // Searches through nodes like Insert/Search
      if (key < root.key) {
        root.left = deleteNode(root.left, key);

      } else if (key > root.key) {
        root.right = deleteNode(root.right, key);

      } else { // root === key (if node is found)

        // if the node to be deleted has one child node
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }
    
        // If the node to be deleted has two child nodes,
        // then we will be replacing its value with that of its
        // inorder successor and recursively delete the inorder successor.
        let successor = this.min(root.right);
        root.key = successor.key;
        root.right = deleteNode(root.right, successor.key);
      }

      return root;
    }

    deleteNode(this.root, node_to_be_deleted_value);
  }
}