
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
function recursive_postorder(root) {
  if (!root) return [];
  const results = [];

  function dfs(node) {
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
function iterative_postorder(root) {
  let result = [];
  if (root === null) result;

  let stack = [root];

  while (stack.length) {
      let current = stack.pop();
      result.push(current.value);
      
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
  }
  result.reverse();
  return result;
}
