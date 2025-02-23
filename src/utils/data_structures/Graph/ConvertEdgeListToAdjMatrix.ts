
/**
* @param {int32} n
* @param {list_list_int32} edges
* @return {list_list_bool}
*/

/*
* Asymptotic complexity in terms of the number of vertices `n` and number of edges `e` in the graph:
* Time: O(e).
* Auxiliary space: O(1).
* Total space: O(n^2).
*/

function convert_edge_list_to_adjacency_matrix(n: any, edges: any) {
  const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(false));

  for (const [u, v] of edges) {
      adjacencyMatrix[u][v] = true;
      adjacencyMatrix[v][u] = true;
  }

  return adjacencyMatrix;
}



/**
 * @param {int32} n
 * @param {list_list_int32} edges
 * @return {list_list_bool}
 */
function convert_edge_list_to_adjacency_matrix2(n, edges) {
  let result = [];
  
  // Create empty matrix
  for (var i = 0; i < n; i++)
  {
      result[i] = new Array(n).fill(false);
  }
  
  for (var i = 0; i < edges.length; i++)
  {
      let [start,end] = edges[i];
      result[start][end] = true;
      result[end][start] = true;
  }
  return result;
}

