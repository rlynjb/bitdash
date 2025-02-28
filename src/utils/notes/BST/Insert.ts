/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const BinaryTreeNode = class {
  value: any;
  left: null;
  right: null;

  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
};

/**
 * ITERATIVE
* @param {BinaryTreeNode_int32} root
* @return {list_int32}
*/
/**
 * Asymptotic complexity in terms of the number of nodes `n`:
 * Time: O(n * n).
 * Auxiliary space: O(n).
 * Total space: O(n).
 */

function iterative_insert_in_bst(root: any, new_value: any) {
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

function iterative_build_a_bst(values: any) {
  let root = null;
  for (let i = 0; i < values.length; i++) {
      root = iterative_insert_in_bst(root, values[i]);
  }
  return root;
}



/**
 * RECURSIVE
 * @param {list_int32} values
 * @return {BinaryTreeNode_int32}
 */
function recursive_insert(current_node: any, new_value: any){
  if(current_node === null){
      return new BinaryTreeNode(new_value);
  }
  if(new_value > current_node.value){
      current_node.right = recursive_insert(current_node.right,new_value);
  }else{
      current_node.left = recursive_insert(current_node.left,new_value);
  }
  return current_node;
}

function recursive_build_a_bst(values: any) {
  let root = null;
  for(let i = 0; i < values.length; i++){
      root = recursive_insert(root,values[i]);
  }
  return root;
}
