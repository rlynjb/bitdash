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
function recursive_inorder(root: any) {
  if(!root) return [];
  const results = [] as any;
  
  function dfs(node: any){
      
      if(node.left) dfs(node.left);
      
      results.push(node.value)
      
      if(node.right) dfs(node.right);
  }
  
  dfs(root);
  return results;
}
