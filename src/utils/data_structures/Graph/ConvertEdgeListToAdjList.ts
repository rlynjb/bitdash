/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Sample Input:
 * {
 *  "n": 5,
 *  "edges": [
 *    [0, 1],
 *    [1, 4],
 *    [1, 2],
 *    [1, 3],
 *    [3, 4]
 *  ]
 * }
 * 
 * ref:
 * https://visualgo.net/en/graphds
 * https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
 * https://www.geeksforgeeks.org/adjacency-list-meaning-definition-in-dsa/
 * https://www.google.com/search?sca_esv=580778d6a72f6f15&sxsrf=AHTn8zq6jPmvQutzTLO1lJqhB6YtzGXEEA:1739923246973&q=Graphs+data+structures+easy+project+example&sa=X&ved=2ahUKEwiu48mYt86LAxWfKkQIHRkwN5AQ1QJ6BAhTEAE&biw=1407&bih=718&dpr=2
 *  
 */


/**
* @param {int32} n
* @param {list_list_int32} edges
* @return {list_list_int32}
*/

/*
* Asymptotic complexity in terms of the number of vertices `n` and number of edges `e` in the graph:
* Time: O(n * log(e)).
* Auxiliary space: O(1).
* Total space: O(n + e).
*/

function convert_edge_list_to_adjacency_list(n: any, edges: any) {
  // Note: creates an array (of size n) of arrays as items
  const adjacencyList = Array.from({ length: n }, () => []) as any;
  

  for (const [u, v] of edges) {
      adjacencyList[u].push(v);
      adjacencyList[v].push(u);
  }

  for (const list of adjacencyList) {
      list.sort((a: any, b: any) => a - b);
  }

  return adjacencyList;
}


// SOLUTION 2

/**
 * @param {int32} n
 * @param {list_list_int32} edges
 * @return {list_list_int32}
 */
function convert_edge_list_to_adjacency_list2(n: any, edges: any) {
  const adjacencyList = [];
  
  for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const first = edge[0];
      const second = edge[1];
      
      if (adjacencyList[first] === undefined) {
          adjacencyList[first] = [second];
      } else {
          adjacencyList[first].push(second);
      }
      
      if (adjacencyList[second] === undefined) {
          adjacencyList[second] = [first];
      } else {
          adjacencyList[second].push(first);
      }
  }
  
  if (adjacencyList.length === 0) {
      return [[]];
  }
  
  return adjacencyList.map((list) => {
      return list.sort((a, b) => a - b)
  });
}
