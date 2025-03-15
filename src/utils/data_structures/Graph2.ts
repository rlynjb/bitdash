/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

class Edge {
  fromNode: any;
  toNode: any;
  weight: any;

  constructor(fromNode: any, toNode: any, weight: any) {
    this.fromNode = fromNode;
    this.toNode = toNode;
    this.weight = weight;
  }
}

class Node2 {
  index: any;
  edges: any;
  label: any;

  constructor(index: any, label: any = null) {
    this.index = index;
    this.edges = {};
    this.label = label;
  }

  isNodeObstacle() {
    return Object.keys(this.edges).length === 0 ? true : false;
  }

  numEdges() {
    return Object.keys(this.edges).length;
  }

  getEdge(neighbor: any) {
    return this.edges[neighbor] || null;
  }

  addEdge(neighbor: any, weight: any) {
    this.edges[neighbor] = new Edge(this.index, neighbor, weight);
  }

  removeEdge(neighbor: any) {
    delete this.edges[neighbor];
  }

  getEdgeList() {
    const result = [];
    const neighbors = Object.keys(this.edges).map(Number);
    neighbors.sort((a, b) => a - b);

    for (const n of neighbors) {
      result.push(this.edges[n]);
    }
    return result;
  }
}

export class Graph2 {
  numNodes: any;
  undirected?: boolean;
  nodes: any;

  constructor(numNodes?: any, undirected: boolean = false) {
    this.numNodes = numNodes;
    this.undirected = undirected;
    this.nodes = Array.from({ length: numNodes }, (_, j: any) => new Node2(j));
  }

  getEdge(fromNode: any, toNode: any) {
    if (fromNode < 0 || fromNode >= this.numNodes) {
      //throw new IndexError();
      return
    }
    if (toNode < 0 || toNode >= this.numNodes) {
      //throw new IndexError();
      return
    }
    return this.nodes[fromNode].getEdge(toNode);
  }

  isEdge(fromNode: any, toNode: any) {
    return this.getEdge(fromNode, toNode) !== null;
  }

  makeEdgeList() {
    const allEdges = [];

    for (const node of this.nodes) {
      for (const edge of Object.values(node.edges)) {
        allEdges.push(edge);
      }
    }
    return allEdges;
  }

  insertEdge(fromNode: any, toNode: any, weight: any) {
    if (fromNode < 0 || fromNode >= this.numNodes) {
      //throw new IndexError();
      return
    }
    if (toNode < 0 || toNode >= this.numNodes) {
      //throw new IndexError();
      return
    }

    this.nodes[fromNode].addEdge(toNode, weight);

    if (this.undirected) {
      this.nodes[toNode].addEdge(fromNode, weight);
    }
  }

  removeEdge(fromNode: any, toNode: any) {
    if (fromNode < 0 || fromNode >= this.numNodes) {
      //throw new IndexError();
      return
    }
    if (toNode < 0 || toNode >= this.numNodes) {
      //throw new IndexError();
      return
    }

    this.nodes[fromNode].removeEdge(toNode);

    if (this.undirected) {
      this.nodes[toNode].removeEdge(fromNode);
    }
  }

  insertNode(label: any = null) {
    const newNode = new Node2(this.numNodes, label);
  
    this.nodes.push(newNode);
    this.numNodes += 1;
    return newNode;
  }

  // TODO
  /*
  makeCopy() {
    const g2 = new Graph(this.numNodes, this.undirected);
  
    for (const node of this.nodes) {
      g2.nodes[node.index].label = node.label;

      for (const edge of Object.values(node.edges)) {
        g2.insertEdge(edge.fromNode, edge.toNode, edge.weight);
      }
    }
    return g2;
  }
  */

  /**
   * everything below are custom
   * ====================================
   */
  addNodeMatrice(index: any, row: any, column: any) {
    this.nodes[index].row = row;
    this.nodes[index].column = column;
  }

  /**
   * @name markObstacle()
   * 
   * @param {number} index id of a node
   * @param {boolean} isObstacle mark if true or false
   */
  markObstacle(index: number, isObstacle: boolean) {
    this.nodes[index].obstacle = isObstacle;
  }
}


/**
 * @name breathFirstSearch()
 * @note 3/8/25
 * this version differs from IK BFS lesson.
 * IK version uses Adjacency List.
 * this, uses node's edgeList and only chooses toNode property.
 * 
 * @note 3/9/25
 * after going through code, its similar to IK
 * it just renames: seen = visited, last = parent, pending = queue
 * and we are returning 'last' because we will use that in 
 * Finding Shortest Path later
 * 
 * @param g 
 * @param startNode 
 * @return {array_number} parent
 * 
 * @todo look into returning unvisited neighbors too for animation purpose.
 * to use in grid diagram
 */
export const breadth_first_search = (g: any, start: number) => {
  const visited = new Array(g.numNodes).fill(false);
  const parent = new Array(g.numNodes).fill(-1);
  const queue = [];

  queue.push(start);
  visited[start] = true;

  while (queue.length > 0) {
    const index: number = queue.shift();
    const current: any = g.nodes[index];

    for (const edge of current.getEdgeList()) {
      const neighbor = edge.toNode;
      
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
        parent[neighbor] = index;
      }
    }
  }
  
  return parent;
}

/*
DFS stack version
function depthFirstSearchStack(g, start) {
  const seen = new Array(g.numNodes).fill(false);
  const last = new Array(g.numNodes).fill(-1);
  const toExplore = [];
  
  toExplore.push(start);
  while (toExplore.length > 0) {
      const ind = toExplore.pop();
      if (!seen[ind]) {
          const current = g.nodes[ind];
          seen[ind] = true;
          
          const allEdges = current.getSortedEdgeList();
          allEdges.reverse();
          for (const edge of allEdges) {
              const neighbor = edge.toNode;
              if (!seen[neighbor]) {
                  last[neighbor] = ind;
                  toExplore.push(neighbor);
              }
          }
      }
  }
}
*/
