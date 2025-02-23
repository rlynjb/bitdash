/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
function recursive_postorder(root: any) {
  if (!root) return [];
  const results = [] as any;

  function dfs(node: any) {
      if (node.left) dfs(node.left);
      if (node.right) dfs(node.right);

      results.push(node.value);
  }

  dfs(root);
  return results;
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
 * @return {list_int32}
 */
function iterative_postorder(root: any) {
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
