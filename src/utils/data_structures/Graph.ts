/* eslint-disable @typescript-eslint/no-explicit-any */

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

/**
 * TODO:
 * How to create linkedlist with size
 * https://www.google.com/search?q=typescript+array+of+linkedlist+with+particular+size+javascript&sca_esv=8a5f3c529fc99551&sxsrf=AHTn8zr-wn0EjorvZnQMrjuR3CtI6gQEhw%3A1740062960990&ei=8EC3Z_mWPMK5kPIPlI6biQY&ved=0ahUKEwj5zrTVv9KLAxXCHEQIHRTHJmEQ4dUDCBA&uact=5&oq=typescript+array+of+linkedlist+with+particular+size+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiPnR5cGVzY3JpcHQgYXJyYXkgb2YgbGlua2VkbGlzdCB3aXRoIHBhcnRpY3VsYXIgc2l6ZSBqYXZhc2NyaXB0SPIPUPoIWNAOcAF4AZABAJgBZqAB_QOqAQM0LjK4AQPIAQD4AQGYAgWgApADwgIKEAAYsAMY1gQYR8ICChAhGKABGMMEGAqYAwCIBgGQBgiSBwMzLjKgB5MY&sclient=gws-wiz-serp
 */
export class Graph {
  adjList: any;
  vertices?: number;
   
  constructor(size?: number) {
    this.vertices = size;
    /**
     * creates an array of linkedlist
     * ex output:
     * [
     *  [0,1],
     *  [1,2],
     *  [2,0]
     * ]
     */
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

  /**
   * Convert to adjacency list
   * ex output:
   * [
   *  [0, 1],
   *  [1, 0],
   *  [1, 2],
   * ]
   * @param n 
   * @param edges 
   * @returns 
   */
  convert_edge_list_to_adj_list(n: any = sample.n, edges: any = sample.edges) {
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
   * ex output:
   * [
   *  [0, 0, 0, 1],
   *  [1, 1, 1, 0],
   *  [0, 1, 0, 2],
   *  [2, 1, 2, 0]
   * ]
   * @param n 
   * @param edges 
   * @returns 
   */
  convert_edge_list_to_adjacency_matrix(n: any, edges: any) {
    const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(false));
  
    for (const [u, v] of edges) {
        adjacencyMatrix[u][v] = true;
        adjacencyMatrix[v][u] = true;
    }
  
    return adjacencyMatrix;
  }
}
