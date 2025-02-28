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

  /**
   * insert()
   * Recursive
   * update root with new node
   * 
   * @param {string} key
   * @param {number} key
   * @returns none
   */
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


  /**
   * insert_iterative()
   * 
   * TODO: clean and test this code
   *
   * Asymptotic complexity in terms of the number of nodes `n`:
   * Time: O(n * n).
   * Auxiliary space: O(n).
   * Total space: O(n).
   * 
   * @param key
   * @returns 
   */
  insert_iterative(key: number[]) {
    const iterative_insert_in_bst = (root: any, new_value: any) => {
      if (root === null) {
        return new BinaryTreeNode(new_value);
      }
    
      let parent = root;
      let current_node = root;
      while (current_node !== null) {
        parent = current_node;
        if (current_node.value < new_value) {
          current_node = current_node.right;
        } else {
          current_node = current_node.left;
        }
      }
    
      if (parent.value < new_value) {
        parent.right = new BinaryTreeNode(new_value);
      } else {
        parent.left = new BinaryTreeNode(new_value);
      }
    
      return root;
    }

    let root = null;
    for (let i = 0; i < key.length; i++) {
      root = iterative_insert_in_bst(root, key[i]);
    }
    return root;
  }


  /**
   * max()
   * if node exist, return node as obj
   * else return key as string
   * 
   * Asymptotic complexity in terms of the number of nodes `n`:
   * Time: O(n).
   * Auxiliary space: O(1).
   * Total space: O(n).
   * 
   * @param {object} node 
   * @return {object} node
   * @return {number} key
   */
  max(node?: any) {
    if (this.root === null) return null;

    let currentNode = node ? node : this.root;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return node ? currentNode : currentNode.key;
  }


  /**
   * min()
   * if node exist, return node as obj
   * else return key as string
   * 
   * @param {object} node 
   * @return {object} node
   * @return {number} key
   */
  min(node?: any) {
    if (this.root === null) return null;

    let currentNode = node ? node : this.root;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return node ? currentNode : currentNode.key;
  }


  /**
   * search()
   * Recursive
   * 
   * @param {string} key
   * @param {number} key
   * @returns {object} node
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


  /**
   * successor()
   * 
   * TODO:
   * look into backtracking ancestral node
   * ex. if node.right is null, it should backtrack to its ancestral node
   * same with Predecessor
   * ref: https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/
   * 
   * @param {string} key
   * @param {number} key
   * @return {number}
   */
  successor(key: any) {
    // edge case, key is empty
    if (key === "" || key === null || key === undefined) return;

    const searchNode = this.search(key);
    return this.min(searchNode.right).key;
  }


  /**
   * predecessor()
   * 
   * @param {string} key
   * @param {number} key 
   * @return {number}
   */
  predecessor(key: any) {
    // edge case, key is empty
    if (key === "" || key === null || key === undefined) return;

    const searchNode = this.search(key);
    return this.max(searchNode.left).key;
  }


  /**
   * delete()
   * Recursive
   * 
   * @param {number} node_to_be_deleted_value
   * @returns {object} root
   */
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
        const successor = this.min(root.right);
        root.key = successor.key;
        root.right = deleteNode(root.right, successor.key);
      }

      return root;
    }

    deleteNode(this.root, node_to_be_deleted_value);
  }

  /**
   * delete()
   * Iterative
   * 
   * @param {number} node_to_be_deleted_value
   * @returns {object} root
   */
  delete_iterative(node_to_be_deleted_value: any) {
    /**
     * TODO: Dryrun through code
     * go through lecture and compare code to notes
     * Using iterative approach for now.
     * Matches with the lecture/explanation.
     * 
     * @param root 
     * @param key 
     * @returns BST tree
     */
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

    deleteNode(this.root, node_to_be_deleted_value);
  }

  /**
   * preOrder()
   * Recursive
   * 
   * @return {array_number}
   */
  preOrder() {
    if (this.root === null) return [];

    const result = [] as number[];

    const dfs = (node: any) => {
      result.push(node.key);
      if (node.left) dfs(node.left);
      if (node.right) dfs(node.right);
    }

    dfs(this.root);

    return result;
  }


  /**
   * preOrder_iterative()
   * Iterative
   * 
   * @return {array_number}
   */
  preOrder_iterative(root: any = this.root) {
    //Base case
    if(!root) return []
    
    const stack = [root]
    const result = []
    
    //Iterate through
    while (stack.length) {
      //Pull out node
      let node = stack.pop()
      
      //Push in node
      result.push(node.value)
      
      //Check right and left and push into result
      if (node.right) stack.push(node.right)
      if (node.left) stack.push(node.left)
    }
    return result;
  }


  /**
   * inOrder()
   * Recursive
   * 
   * @returns {array_number}
   */
  inOrder() {
    if (this.root === null) return [];

    const result = [] as number[];

    const dfs = (node: any) => {
      if (node.left) dfs(node.left);
      result.push(node.key);
      if (node.right) dfs(node.right);
    }

    dfs(this.root);

    return result;
  }

  /**
   * postOrder()
   * Recursive
   * 
   * @return {array_number}
   */
  postOrder() {
    if (this.root === null) return [];

    const result = [] as number[];

    const dfs = (node: any) => {
      if (node.left) dfs(node.left);
      if (node.right) dfs(node.right);
      result.push(node.key);
    }

    dfs(this.root);

    return result;
  }


  /**
   * postOrder_iterative()
   * Iterative
   * 
   * TODO: dry run this code. clean and test this code 
   * 
   * @param {object} root
   * @return {array_number}
   */
  postOrder_iterative(root: any = this.root) {
    const result = [] as any;
    if (root === null) result;
  
    const stack = [root];
  
    while (stack.length) {
      const current = stack.pop();
      result.push(current.value);
      
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
    result.reverse();
    return result;
  }
}
