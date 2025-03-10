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
* @return {list_int32}
*/

/*
Asymptotic complexity in terms of the number of nodes `n`:
* Time: O(n).
* Auxiliary space: O(1).
* Total space: O(n).
*/

function get_maximum_value1(root: any): any {
  while (root.right != null) {
      root = root.right;
  }
  return root.value;
}


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
 * @return {int32}
 */
function get_maximum_value2(root: any) {
  if (root === null) {
      return null;
  }
  let current = root;
  while (current.right !== null) {
      current = current.right;
  }
  return current.value;
}
