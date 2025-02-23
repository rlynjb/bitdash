
/**
* @param {int32} n
* @param {list_list_int32} edges
* @return {list_int32}
*/

/*
* Asymptotic complexity in terms of the number of vertices `v` and number of edges `e` in the graph:
* Time: O(v + e).
* Auxiliary space: O(v + e).
* Total space: O(v + e).
*/

function dfs_traversal_helper(u: any, graph: any, answer: any, isVisited: any): any {
  isVisited[u] = true;
  answer.push(u);

  for (const v of graph[u]) {
    if (!isVisited[v]) {
      dfs_traversal_helper(v, graph, answer, isVisited);
    }
  }
}

function dfs_traversal(n: any, edges: any) {
  const graph = Array.from({ length: n }, () => []) as any;
  const isVisited = new Array(n).fill(false);
  const answer = [] as any;

  // Making a graph from the input edges.
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let i = 0; i < n; i++) {
    if (!isVisited[i]) {
      dfs_traversal_helper(i, graph, answer, isVisited);
    }
  }

  return answer;
}
