/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @desc this version is from IK
 * 
 * Learning ref:
 * https://www.npmjs.com/package/datastructures-js
 * 
 * games that uses data structure and algorithms
 * ref: https://www.google.com/search?q=games+that+uses+data+structure+and+algorithms&sca_esv=3d212cfe0cf3ba87&rlz=1C9BKJA_enUS1062US1066&hl=en-US&sxsrf=AHTn8zpPiBqaNaUC1Y_EL_WiBdAa25KVFg%3A1740748616034&ei=SLfBZ-fvAbmlkPIPw-u52A0&ved=0ahUKEwjns5v3ueaLAxW5EkQIHcN1DtsQ4dUDCBA&uact=5&oq=games+that+uses+data+structure+and+algorithms&gs_lp=Egxnd3Mtd2l6LXNlcnAiLWdhbWVzIHRoYXQgdXNlcyBkYXRhIHN0cnVjdHVyZSBhbmQgYWxnb3JpdGhtczIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0iNA1AAWABwAXgBkAEAmAEAoAEAqgEAuAEDyAEAmAIBoAIDmAMAiAYBkAYIkgcBMaAHAA&sclient=gws-wiz-serp
 * 
 * How do you decide which data structure to use?
 * https://www.reddit.com/r/compsci/comments/150c1fl/how_do_you_decide_which_data_structure_to_use/
 * 
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

const sample3 = {
  "n": 6,
  "edges": [
    [0, 1],
    [0, 2],
    [1, 4],
    [3, 5]
  ]
}


export class Graph {
  adjList: any;
  vertices?: number;
  edgeList?: number[][];
   
  constructor(size?: number, edgeList?: number[][]) {
    this.vertices = size;
    this.edgeList = edgeList;
    //this.adjList = Array.from({ length: size as number }, () => []);
    this.adjList = this.displayAdjacencyList(size, edgeList)
  }


  /**
   * addEdge()
   * 
   * @param {number} source 
   * @param {number} target 
   * @param {boolean} undirected 
   */
  addEdge(source: number, target: number, undirected: boolean = true) {
    this.adjList[source].push(target);

    if (undirected) {
      this.adjList[target].push(source);
    }
  }


  /**
   * hasEulerianCycle()
   * 
   * @returns {boolean}
   */
  hasEulerianCycle(): boolean {
    /**
     * NOTE:
     * in Undirected graph, there will be Eulerian cycle
     * if and only if every vertex has an even degree
     */
    let odd = 0; // keeps track of # of vertices have odd degree

    for (const vertex in this.adjList) { // start traversing adjacency list
      /**
       * check degree (size) of each vertex 
       * if degree of vertex is odd
       * then if we take that degree and divided by 2
       * we should get remainder of 1.
       * equaling to 1 is indication vertex has a odd degree
       */
      if ((this.adjList[vertex].length / 2) === 1) {
        odd++;
      }
    }

    if (odd === 0) { // graph has no odd degree, it is indeed Eulerian cycle
      return true;
    } else {
      return false;
    };
  }


  /**
   * hasEulerianPath()
   * 
   * @returns {boolean}
   */
  hasEulerianPath(): boolean {
    // NOTE: same as hasEulerianCycle but slight different.
    let odd = 0; // keeps track of # of vertices have odd degree

    for (const vertex in this.adjList) {
      if ((this.adjList[vertex].length / 2) === 1) {
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
   * uses Queue FIFO
   * 
   * Asymptotic complexity in terms of the number of vertices `v` and number of edges `e` in the graph:
   * Time: O(v + e).
   * Auxiliary space: O(v + e).
   * Total space: O(v + e).
   * 
   * @todo clean up bfs_traversal
   * 
   * @param {int32} n
   * @param {list_list_int32} edges
   * @return {list_int32}
   */
  bfs_traversal(n: any = this.vertices, edges: any = this.edgeList): any {
    // base case
    if (edges.length === 0 || !n) return [];

    /**
     * 0. convert edgelist to adjlist first
     */

    /**
     * 1. visited - represents all nodes/vertex
     */
    const visited = Array(n).fill(null)

    const result = [] as any

    const bfs_helper = (start: any) => {
      /**
       * 2. add to Queue first, then mark as visited
       */
      const queue = []
      queue.push(start)
      visited[start] = true
      
      /**
       * 3. now, work on Queue items.
       * remove first item (unshift = FIFO)
       * and add to result
       */
      while(queue.length) {
        const u: any = queue.shift()
        result.push(u)
        
        /**
         * 4. work on its (the pulled item from Queue) neighbors
         * only add to Queue what has NOT been visited
         */
        for (const v of this.adjList[u]) {
          if (!visited[v]) {
            queue.push(v)
            visited[v] = true
          }
        }
      }
    }

    /**
     * 5. finish all items in Queue first.
     * repeat step #3
     */
    

    /**
     * i is starting Vertex/Node
     */
    for (let i=0; i<n; i++) {
      /**
       * 6. only process whats NOT been visited
       */
      if (!visited[i]) {
        bfs_helper(i)
      }
    }    
  
    return result;
  }


  /**
   * dfs_traversal()
   * Recursive
   * Iterative version uses Stack LIFO
   * 
   * Asymptotic complexity in terms of the number of vertices `v` and number of edges `e` in the graph:
   * Time: O(v + e).
   * Auxiliary space: O(v + e).
   * Total space: O(v + e).
   * 
   * @param {int32} n
   * @param {list_list_int32} edges
   * @return {list_int32}
   */
  dfs_traversal(n: any = this.vertices, edges: any = this.edgeList): any {
    // base case
    if (edges.length === 0 || !n) return [];

    /**
     * 0. convert edgelist to adjlist first
     */

    /**
     * 1. visited - represents all nodes/vertex
     */
    const visited = new Array(n).fill(false);
    const answer = [] as any;

    const dfs_traversal_helper = (u: any, graph: any, answer: any, visited: any): any => {
      visited[u] = true;
      answer.push(u);
    
      for (const v of graph[u]) {
        if (!visited[v]) {
          dfs_traversal_helper(v, graph, answer, visited);
        }
      }
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        dfs_traversal_helper(i, this.adjList, answer, visited);
      }
    }
  
    return answer;
  }


  /**
   * displayAdjacencyList()
   * Convert Edge List to Adjacency List
   * 
   * TODO: clean code and dry dun
   * 
   * @param n 
   * @param edges 
   * @returns {Array}
   */
  displayAdjacencyList(n: any = this.vertices, edges: any = this.edgeList): any {
    const adjacencyList = Array.from({ length: n }, () => []) as any;
    
    for (let i=0; i<edges.length; i++) {
      const u = parseInt(edges[i][0])
      const v = parseInt(edges[i][1])
      adjacencyList[u].push(v)
      adjacencyList[v].push(u)
    }

    for (const list of adjacencyList) {
      list.sort((a: any, b: any) => a - b);
    }

    return adjacencyList;
  }

  /**
   * displayAdjacencyMatrix()
   * convert edge list to adjacency matrix
   * 
   * @param n 
   * @param edges 
   * @returns {Array} number[][]
   */
  displayAdjacencyMatrix(n: any = this.vertices, edges: any = this.edgeList): any {
    const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(false));
  
    for (const [u, v] of edges) {
      adjacencyMatrix[u][v] = true;
      adjacencyMatrix[v][u] = true;
    }
  
    return adjacencyMatrix;
  }


  /**
   * numberOfConnectedComponents()
   * using BFS traversal/solution
   * - this is to check if a graph is connected.
   * 
   * @param {number} n 
   * @param {array} edges
   * @returns {number}
   */
  numberOfConnectedComponents(n: any = this.vertices, edges: any = this.edgeList): number {
    // base case
    if (edges.length === 0 || !n) return 0;

    // CHANGE: numberOfComponent
    let numberOfComponents = 0;

    const visited = Array(n).fill(null);
    const result = [] as any;

    const bfs_helper = (startingNode: any) => {
      const queue = [];
      queue.push(startingNode);
      visited[startingNode] = true;

      while (queue.length) {
        const u: any = queue.shift();
        result.push(u);

        for (const v of this.adjList[u]) {
          if (!visited[v]) {
            queue.push(v);
            visited[v] = true;
          }
        }
      }
    }

    for (let i=0; i<n; i++) {
      if (!visited[i]) {
        // CHANGE: numberOfComponent
        numberOfComponents++;
        bfs_helper(i);
      }
    }

    return numberOfComponents;
  }


  /**
   * isGraphValidTree()
   * using BFS traversal/solution
   * can also use "union-find data structure" for another solution
   * 
   * Asymptotic complexity in terms of number of nodes `n` and number of edges `m`:
   * Time: O(n + m).
   * Auxiliary space: O(n + m).
   * Total space: O(n + m).
   * 
   * @param {number} n 
   * @param {array} edges 
   * @return {boolean}
   * 
   * @notes
   * a Tree is a connected graph with NO cycles
   */
  isGraphValidTree(n: any = this.vertices, edges: any = this.adjList): boolean {
    // base case
    if (edges.length === 0 || !n) return false;

    // CHANGE: numberOfComponent
    let numberOfComponents = 0;
    // CHANGE: isGraphTree
    let isTree = true;

    const visited = Array(n).fill(null);
    const result = [] as any;
    // CHANGE: isGraphTree
    const parent = Array(n).fill(null);

    const bfs_helper = (startingNode: any) => {
      const queue = [];
      queue.push(startingNode);
      visited[startingNode] = true;

      // explore current nodes' edges/neighbors
      while (queue.length) {
        const currentNode: any = queue.shift();
        result.push(currentNode);

        for (const neighbor of this.adjList[currentNode]) {
          // if neighbor/edge has not been visited yet
          if (!visited[neighbor]) { // creating tree edge
            queue.push(neighbor);
            visited[neighbor] = true;
            parent[neighbor] = currentNode;

          } else { // neighbor has been visited
            // and neighbor is not parent <- means its a Cross edge
            // this concludes its a cycle
            /**
             * if node has been visited and
             * its parent is not the current visiting node.
             * it means, its been visited from a different parent.
             * its occuring again, because it signifies
             * that the neighbor/edge is the link between two parent nodes
             */
            if (neighbor != parent[currentNode]) {
              isTree = true;
              return true;
            }
          }
        }
      }

      // CHANGE: isGraphTree
      return false;
    }

    // go through each node. n as id/key
    for (let i=0; i<n; i++) {
      // run bfs if node has not been visited
      if (!visited[i]) {
        // keep track of number of graphs (components)
        numberOfComponents++;
        /**
         * if graph has more than 1 component,
         * it cannot be a Tree.
         * coz Trees are Connected graph with no Cycle
         */
        if (numberOfComponents > 1) {
          isTree = false;
          return false;
        }

        // run bfs on that node by passing in its id/key
        if (bfs_helper(i) === true) {
          isTree = false;
          return false;
        }
      }
    }

    return isTree;
  }


  /**
   * search()
   * 
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
   * @topic Eulerian Cycles
   * 
   * A graph has Eulerian Cycle only if:
   * - all vertices must have EVEN degrees
   *
   * A graph does NOT have Eulerian Cycle if:
   * - ex. 4 vertices have ODD degrees, but 1 vertex have EVEN degrees
   * - ex. 4 vertices have EVEN degrees, but 2 vertices have ODD degrees
   * 
   * A graph must be CONNECTED to have Eulerian Cycle in it.
   * Its possible for Disconneted Graph to have Eulerian cycle.
   * - ex. 1st graph has 3 vertices and has EVEN degrees.
   * - While, 2nd graph has 1 vertex.
   * 
   * @topic Eulerian Cycle Construction
   * a mini walk of Graph.
   * a guarantee way to visit all vertices and edges by backtracking to UNUSED edges,
   * using small cycles, and detour vertex.
   * all vertices having EVEN degrees is guarantee way to not get trapped.
   */
/**
* @param {int32} n
* @param {list_list_int32} edges
* @return {bool}
*/

// -------- START --------
/*
* Asymptotic complexity in terms of the number of vertices ( = `n`) and number of edges ( = `e`):
* Time: O(n + e).
* Auxiliary space: O(n).
* Total space: O(n + e).
*/

check_if_eulerian_cycle_exists(n: any, edges: any): boolean {
  // all vertices have EVEN degrees
  // graph is cnnected

  // Step 1: Initialize an array to store the degree of each vertex
  const degree = new Array(n).fill(0);

  // Step 2: Calculate the degree of each vertex
  for (const [u, v] of edges) {
    degree[u]++;
    degree[v]++;
  }

  // Step 3: Check if all vertices have even degrees
  for (const d of degree) {
    if (d % 2 !== 0) {
      return false;
    }
  }

  return true;
}

  /**
   * @topic Eulerian Path
   * 
   * Is there Eulerian Path in the Graph?
   * - assume Graph is connected for now.
   * - all vertices have EVEN degrees
   * - Path could be an Eulerian Cycle
   * - could Start & End at two different vertices that can
   * have ODD degree. all other vertices need to have EVEN degree.
   * 
   * if there are 0 numbers of vertices with ODD degree, then its an Eulerian Cycle.
   * if there are 2 numbers of vertices with ODD degree, then its an Eulerian Cycle.
   * - only Start and End vertice are allowed to have ODD degree.
   * - but, it we add an edge between these 2 vertices, it will be an Eulerian Cycle.
   * if there are 4 or more number of vertices with ODD degree, then there can
   * be no Eulerian Cycle or Eulerian Path.
   * 
   */
}
