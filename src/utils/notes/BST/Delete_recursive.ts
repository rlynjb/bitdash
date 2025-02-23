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

/*
Asymptotic complexity in terms of the number of nodes in the BST `n` and the size of the input list `m`:
* Time: O(n * m).
* Auxiliary space: O(n).
* Total space: O(n + m).
*/

function deleteNode(root: any, value: any) {
  // edge case
  if (root === null) {
    return root;
  }

  // search for node to be deleted by using linear traversal
  if (value < root.value) {
    root.left = deleteNode(root.left, value)
  }
  else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  }
  else { // root === value;
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // If the node to be deleted has two child nodes, then we will be replacing its value with that of its
    // inorder successor and recursively delete the inorder successor.
    const successor = findMin(root.right);
    root.value = successor.value;
    root.right = deleteNode(root.right, successor.value);
  }
  return root;
}

function findMin(node: any) {
  while (node.left !== null) {
    node = node.left
  }
  return node;
}

function deleteNodesFromBST(root: any, numbers: any) {
  for (const number of numbers) {
    root = deleteNode(root, number);
  }
  return root;
}
function delete_from_bst_recursive(root: any, values_to_be_deleted: any) {
  // Write your code here.
  return deleteNodesFromBST(root, values_to_be_deleted)
}
