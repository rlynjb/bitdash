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

  /**
   * 
   * @param key 
   * @returns node
   */
  search(key: any) {
    // edge case, key is empty
    if (key === "" || key === null || key === undefined) return;

    // edge case, nothing to process
    if (this.root === null) {
      return this.root;
    }

    let result = null;

    const searchNode = (currentNode: any, key: any) => {
      // if key is lower than currentNode.key/root.key
      if (key < currentNode.key) {
        // if left is not empty, compare
        if (currentNode.left !== null) {
          // call searchNode possibly
          searchNode(currentNode.left, key);
        }
      } else if (key > currentNode.key) { // key is higher than currentNode.key/root.root
        // and its not empty, compare
        if (currentNode.right !== null) {
          // call searchNode to compare possibly
          searchNode(currentNode.right, key);
        }
      } else { // if key is same as currentNode.key/root.key
        result = currentNode
      }
    }

    searchNode(this.root, key);

    return result;
  }

  successor(key: any) {
    // edge case, key is empty
    if (key === "" || key === null || key === undefined) return;

    const searchNode = this.search(key);
    return this.min(searchNode.right).key;
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
    

    /**
     * Using iterative approach for now.
     * Matches with the lecture/explanation.
     * 
     * @param root 
     * @param key 
     * @returns BST tree
     */
    /*
    const deleteNode = (root: any, key: any) => {
      if (root === null) return null;
        
      let curr = root;
      let prev = null;
      let child = null;
        
      while (curr !== null) {
        if (key === curr.key) {
          break;
        } else if(key < curr.key) {
          prev = curr;
          curr = curr.left;
        } else {
          prev = curr;
          curr = curr.right;
        }
      }
        
      if (curr === null) {
        return root;
      }
        
      // node is a leaf
      if (curr.left === null && curr.right === null) {
        if (prev === null) {
          return null;
        } else if (curr === prev.left) {
          prev.left = null;
        } else {
          prev.right = null;
        }
      }
        
      // node has one child
      if (curr.left === null && curr.right !== null) {
        child = curr.right;
      } 
        
      if (curr.left !== null && curr.right === null) {
        child = curr.left;
      }

      // 
      if (child !== null) {
        if (prev === null) {
          return child;
        }
          
        if (curr === prev.left) {
          prev.left = child;
        } else {
          prev.right = child;
        }
      }
        
      // node has two children
      if (curr.left !== null && curr.right !== null) {
        let succ = curr.right;
        prev = curr;
        
        while (succ.left !== null) {
          prev = succ;
          succ = succ.left;
        }
          
        // replace deleted node with succession key
        curr.key = succ.key;
        
        if (succ === prev.left) {
          prev.left = succ.right;
        } else {
          prev.right = succ.right;
        }
      }
        
      return root;
    }
    */

    deleteNode(this.root, node_to_be_deleted_value);
  }
}