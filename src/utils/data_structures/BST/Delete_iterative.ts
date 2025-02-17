/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/*
For your reference:
const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};
*/
/**
 * @param {BinaryTreeNode_int32} root
 * @param {list_int32} values_to_be_deleted
 * @return {BinaryTreeNode_int32}
 */


function delete_from_bst(root: any, values_to_be_deleted: any): any {
  for(let i = 0; i < values_to_be_deleted.length; i++) {
    root = deleteNode(root, values_to_be_deleted[i]);
  }
  
  return root;
  
  function deleteNode(root: any, key: any) {
    if (root === null) {
      return null;
    }
      
    let curr = root;
    let prev = null;
    let child = null;
      
    while (curr !== null) {
      if (key === curr.value) {
        break;
      } else if(key < curr.value) {
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
        curr.value = succ.value;
        
        if (succ === prev.left) {
          prev.left = succ.right;
        } else {
          prev.right = succ.right;
        }
      }
      
      return root;
  }
}
