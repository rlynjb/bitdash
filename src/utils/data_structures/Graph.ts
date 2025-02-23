/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Learning ref:
 * https://www.npmjs.com/package/datastructures-js
 */

const sample = {
  "n": 5,
  "edges": [
    [0, 1],
    [1, 4],
    [1, 2],
    [1, 3],
    [3, 4]
  ]
}

const sample2 = {
  "n": 6,
  "edges": [
    [0, 1],
    [0, 2],
    [0, 4],
    [2, 3]
  ]
}


export class Graph {
  adjList: any;
  vertices?: number;
  edgeList?: number[][];
  adjMatrix?: any;
   
  constructor(size?: number, edgeList?: number[][]) {
    this.vertices = size;
    this.edgeList = edgeList;
    this.adjList = Array.from({ length: size as number }, () => []);
  }

  addEdge(start: number, end: number, undirected: boolean = true) {
    this.adjList[start].push(end);

    if (undirected) {
      this.adjList[end].push(start);
    }
  }

  /**
   * hasEulerianCycle
   * @returns {boolean}
   */
  hasEulerianCycle(): boolean {
    /**
     * NOTE:
     * in Undirected graph, there will be Eulerian cycle
     * if and only if every vertex has an even degree
     */
    let odd = 0; // keeps track of # of vertices have odd degree

    // start traversing adjacency list
    for (const vertex in this.adjList) {
      /**
       * check degree (size) of each vertex 
       * if degree of vertex is odd
       * then if we take that degree and divided by 2
       * we should get remainder of 1.
       * equaling to 1 is indication vertex has a odd degree
       */
      if ((this.adjList[vertex].size() / 2) === 1) {
        odd++;
      }
    }

    // graph has no odd degree, it is indeed Eulerian cycle
    if (odd === 0) {
      return true;
    } else {
      return false;
    };
  }

  /**
   * hasEulerianPath()
   * @returns boolean
   */
  hasEulerianPath() {
    // NOTE: same as hasEulerianCycle but slight different.
    let odd = 0; // keeps track of # of vertices have odd degree

    for (const vertex in this.adjList) {
      if ((this.adjList[vertex].size() / 2) === 1) {
        odd++;
      }
    }

    /**
     * if odd == 0, there is Eulerian cycle in graph
     * and every eulerian cycle is an eulerian path
     * or if odd is exactly 2, then also there will be
     * eulerian path in the graph, w/c will start from
     * one of these 2 vertices and end in the other vertex
     * 
     */
    if (odd === 0 || odd === 2) {
      return true;
    } else {
      // if odd has 1,3,4,5,6, etc
      return false;
    }
  }

  /**
   * bfs_traversal()
   * @param {int32} n
   * @param {list_list_int32} edges
   * @return {list_int32}
   */
  bfs_traversal(n: any = this.vertices, edges: any): any {
    const adjListGraph: any = Array(n).fill(false).map(() => [])
    const visited = Array(n).fill(null)
    const result = [] as any
    
    //build graph
    for (let i=0; i<edges.length; i++) {
      const u = edges[i][0]
      const v = edges[i][1]
      adjListGraph[u].push(v)
      adjListGraph[v].push(u)
    }
    
    // bfs traverse using queue FIFO
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

  /**
   * dfs_traversal()
   * @param {int32} n
   * @param {list_list_int32} edges
   * @return {list_int32}
   */
  dfs_traversal(n: any = this.vertices, edges: any): any {
    const graph = Array.from({ length: n }, () => []) as any;
    const isVisited = new Array(n).fill(false);
    const answer = [] as any;
  
    // Making a graph from the input edges.
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    const dfs_traversal_helper = (u: any, graph: any, answer: any, isVisited: any): any => {
      isVisited[u] = true;
      answer.push(u);
    
      for (const v of graph[u]) {
        if (!isVisited[v]) {
          dfs_traversal_helper(v, graph, answer, isVisited);
        }
      }
    }
  
    for (let i = 0; i < n; i++) {
      if (!isVisited[i]) {
        dfs_traversal_helper(i, graph, answer, isVisited);
      }
    }
  
    return answer;
  }

  /**
   * Convert to adjacency list
   * @param n 
   * @param edges 
   * @returns {Array} number[][]
   */
  convert_edge_list_to_adjacency_list(n: any = sample.n, edges: any = sample.edges): any {
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

  /**
   * convert edge list to adjacency matrix
   * @param n 
   * @param edges 
   * @returns {Array} number[][]
   */
  convert_edge_list_to_adjacency_matrix(n: any, edges: any): any {
    const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(false));
  
    for (const [u, v] of edges) {
      adjacencyMatrix[u][v] = true;
      adjacencyMatrix[v][u] = true;
    }
  
    return adjacencyMatrix;
  }


  /**
   * search()
   * NOTE: keep track of parents in search tree
   * @param sourceVertex 
   */
  search(sourceVertex: number = 0) {
    /**
     * start exploring the graph systematically
     * starting from the sourceVertex ^^
     */
  
    /**
     * define a simple bit array (captured).
     * keeps track which vertices has been captured
     * so far by the algorithm
     * ex.
     * captured[v] = 0 <-- "Yet to capture" set
     * captured[v] = 1 <-- "Captured" set
     * 
     * initially, all vertices lie on "Yet to capture" set
     * thats why captured.length is initialize to 0
     * 
     * except for sourceVertex <-- only vertex to start out
     * in the "Captured" set
     **/
    const captured = [] as any; // look into types of Array
    captured[sourceVertex] = 1

    /**
     * define parent array.
     * keeps track of which parent pulled in the vertices to Captured set.
     * 
     * parent array init to null.
     * none of the vertices have a parent
     * applies to sourceVertex as well.
     * 
     * Pseudocode for General Graph Search:
     * captured[s] = 1
     * while there exists a fringe edge:
     *  pick one of them => (u,v)
     *  captured[v] = 1
     *  parent[v] = u
     * 
     **/ 
  }
}
