/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

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
function iterative_preorder(root: any) {
  if (root === null) [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length) {
      const current = stack.pop();
      result.push(current.value);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
  }
  return result;
}


/**
 * @param {BinaryTreeNode_int32} root
 * @return {list_int32}
 */
const recursive_preorder = (root: any) => {
    // Write your code here.
    if(!root) return [];
    const results = [] as any;
    
    function dfs(node: any) {
        results.push(node.value);
        
        if(node.left) dfs(node.left);
        if(node.right) dfs(node.right);
    }
    
    dfs(root);
    
    return results;
}
