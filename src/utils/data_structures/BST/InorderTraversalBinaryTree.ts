
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
function recursive_inorder(root) {
  if(!root) return [];
  const results = [];
  
  function dfs(node){
      
      if(node.left) dfs(node.left);
      
      results.push(node.value)
      
      if(node.right) dfs(node.right);
  }
  
  dfs(root);
  return results;
}
