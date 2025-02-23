/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @param {int32} n
 * @param {list_list_int32} edges
 * @return {list_int32}
 */
function bfs_traversal(n: any, edges: any): any {
  // Write your code here.
  const adjListGraph: any = Array(n).fill(undefined).map(() => [])
  const visited = Array(n).fill(null)
  const result = [] as any
  
  //build graph
  for (let i=0; i<edges.length; i++) {
    const u = edges[i][0]
    const v = edges[i][1]
    adjListGraph[u].push(v)
    adjListGraph[v].push(u)
  }
  
  // bfs traverse
  const bfs_helper = (start: any) => {
    const queue = []
    queue.push(start)
    visited[start] = true
      
    while(queue.length) {
      const u = queue.shift()
      result.push(u)
      
      for (const v of adjListGraph[u]) {
        if (!visited[v]) {
          queue.push(v)
          visited[v] = true
        }
      }
        
    }
      
  }   
  
  for (let i=0; i<n; i++) {
    if (!visited[i]) {
      bfs_helper(i)
    }
  }    

  return result;
}


