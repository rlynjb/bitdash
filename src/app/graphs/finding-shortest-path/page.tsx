"use client";

import "./styles.css";
import { Graph2, PriorityQueue, getRandomEdgeWeight } from "@/utils/data_structures";
import { useState } from "react";
import { delayLoop } from "@/utils";
/*
import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  ICompare,
  IGetCompareValue,
} from '@datastructures-js/priority-queue';
 */

/**
 * NOTE:
 * work on separating makeGridGraph to its own GridVisualizer
 * utils
 */

export default function FindingShortestPath() {
  const [ width, setWidth ] = useState(3);
  const [ height, setHeight ] = useState(3);
  const [ pxSize, setPxSize ] = useState(60);
  const [ timer, setTimer ] = useState(50);
  const [ highlight, setHighlight ] = useState([] as number[]);

  /**
   * NOTE:
   * in Python,
   * they use tuple for this data structure
   * in JavaScript,
   * we're just using array with objects as items
   * - research if there is JS alternative to Python tuple
   * 
   * ref:
   * https://ntgard.medium.com/tuples-in-javascript-cd33321e5277
   * https://medium.com/sessionstack-blog/how-javascript-works-arrays-vs-hash-tables-ab769bf84a2d
   */
  const [obstacles, setObstacles] = useState([
    //{row: 0, column: 0},
    //{row: 1, column: 1},
    //{row: 2, column: 2},
  ])


  /**
   * @name isObstacle()
   * @desc checks if a node is an obstacle using its row/column
   * 
   * @param {number} row
   * @param {number} column
   * @param {array_objects} obstacles
   * @return {boolean}
   */
  const isObstacle = (row: any, column: any, obstacles: any): boolean => {
    const itExist = obstacles.find((v: any) => v.row === row && v.column === column)
    return itExist ? true : false;
  }


  /**
   * @name makeGridGraph()
   * @desc
   * |_ core code that builds te grid diagram
   * |_ updates Graph class with:
   * |  |_ inserts a nodes' edges
   * |  |  |_ determines if a node should have edges or no (obstacle)
   * |  |_ use to keep track of obstacles 
   * |  |  |_ mark a node if its an obstacle
   * |  |_ used in templating, to grey out an obstacle
   * 
   * @param {object} graph class
   * @param {number} width 
   * @param {number} height 
   * @returns {object} graph class
   * @update passed graph class
   * 
   * @todo move this inside Graph2 possibly
   */
  const makeGridGraph = (width: number, height: number, obstacles?: any) => {
    // NOTE: only use if graph class is defined inside
    const numNodes = width * height;
    const g = new Graph2(numNodes, true);
    //const g = graph;

    for (let r=0; r<height; r++) {
      for (let c=0; c<width; c++) {
        const index = r * width + c;

        if (!isObstacle(r, c, obstacles)) {
          if (c < width - 1 && !isObstacle(r, c+1, obstacles)) {
            g.insertEdge(index, index + 1, getRandomEdgeWeight(1, 10));
          }
          if (r < height - 1 && !isObstacle(r+1, c, obstacles)) {
            g.insertEdge(index, index + width, getRandomEdgeWeight(1, 10))
          }
        }

        if (isObstacle(r, c, obstacles)) {
          g.markObstacle(index, true)
        }

        g.addNodeMatrice(index, r, c)
        
      }
    }

    /**
     * NOTE:
     * update edges and insert direction
     */
    console.log(g)


    return g;
  }

  const graph = makeGridGraph(width, height, obstacles);
  //console.log(graph)

  /**
   * @name computeNextRow()
   * 
   * @param {number} totalNodes
   * @param {number} columnsPerRow
   * @return {array_number} list of cell index that should be in next row/line
   * 
   * @todo possibly move to graph2 class
   */
  const computeNextRow = (totalNodes: number, columnsPerRow: number): number[] => {
    let counter = 1;
    let row = columnsPerRow;
    let result = [] as any;

    result.push(columnsPerRow)

    for (let i=0; i<totalNodes; i++) {
      if (i === row) {
        counter++;
        row = columnsPerRow * counter;
        result.push(row)
      }
    }
    return result;
  }

  /**
   * @name addObstacle()
   * 
   * @param {number} row
   * @param {number} column
   * @update obstacles
   */
  const addObstacle = (row?: any, column?: any, nodeIndex?: any) => {
    // base case    
    if (isObstacle(row, column, obstacles)) return;

    // NOTE: use for plain JS
    // obstacles.push({row, col: column})

    // markObstacle for templating purpose
    graph.markObstacle(nodeIndex, true)
    // setObstacles for keeping track
    setObstacles((prev) => [...prev, {row, column}] as any)
  }

  /**
   * CSS class helpers
   */
  const highlightCell = (nodeIndex: number): string => {
    return highlight.includes(nodeIndex) ? ' highlight' : '';
  }
  const cellAsObstacle = (obstacle: boolean): string => {
    return obstacle ? ' obstacle' : '';
  }
  const moveCellToNextline = (totalNodes: number, width: number, nodeIndex: number): string => {
    return computeNextRow(totalNodes, width).includes(nodeIndex) ? ' clear-left' : ''
  }


  /**
   * find shortest path
   */
  const Dijkstras = (g: any, start_index: any, end_index: any = 0) => {
    // a list of best costs so far for each node
    const cost = new Array(end_index).fill(Infinity);
    // a list indicating the last node visited before a given node aka parent
    const parent = new Array(end_index).fill(-1);
    // a minheap of unvisited nodes
    const pq = new PriorityQueue(0, true);
  
    // adds all nodes in PQ, but mark starting node priority to 0.0
    /**
     * NOTE:
     * this is where we'll define start and end node.
     * for now, work on rendering path for default start and end node.
     * What is shortest path from point A (index 0) to point B (last index, end_index)
     */
    pq.enqueue(start_index, 0.0);
    for (let i = 0; i < end_index; i++) {
      if (i !== start_index) {
        pq.enqueue(i, Infinity);
      }
    }
    cost[start_index] = 0.0;
  
    // we then process the nodes stored in PQ one by one
    while (!pq.isEmpty()) {
      // while PQ isnt empty,
      // extract the min priority node...
      const currentMinNode = pq.dequeue();

      //console.log('currentMinNode', currentMinNode, g.nodes[currentMinNode])

      // ...and explore the node via its edges or neighbors
      // use node from PQ as index to access nodes in graphs
      for (const edge of g.nodes[currentMinNode].getEdgeList()) {
        const neighbor = edge.toNode;

        //console.log('neighbor', edge)

        // we go through each neighbors and see if neighbor
        // is still in PQ
        // if it is, means the code hasn't visited it yet
        if (pq.inQueue(neighbor)) {
          //console.log('inQueue', neighbor)
          // takes in current node and add it with its
          // neighbors' edge weight
          const currentNode_newCost = cost[currentMinNode] + edge.weight;

          // checks if current nodes' weight cost is lower than
          // its neighbors cost weight.
          // fyi, all infinite cost will be updated when they are first seen
          // THIS IS WHERE IT FINDS THE BEST LOWEST COST
          if (currentNode_newCost < cost[neighbor]) {
            // update the currentNode's neighbor with new lowest cost
            pq.updatePriority(neighbor, currentNode_newCost);

            parent[neighbor] = currentMinNode;
            cost[neighbor] = currentNode_newCost;


            //console.log('last', parent[currentMinNode], 'node', currentMinNode, 'neighbor', neighbor, 'currentNode_newCost', currentNode_newCost)
            //console.log('last', parent)
            //console.log('cost', cost)
          }
        }
      }
    }

    /**
     * @title Render Shortest Path
     * Calculate Path from Starting node to End node
     * and return path instead of parent.
     * Then highlight cellIndex in path sequence.
     * 
     * NOTE:
     * look into eulerian cycle or
     * if graph is a valid tree topic
     * to fix why path being return includes 2 extra cyclic nodes/edges
     */
    console.log('parent/last:', parent)
  
    return parent;
  }

  const dPath = Dijkstras(graph, graph.nodes[0].index, graph.numNodes);

  //console.log(graph.nodes)

  /**
   * @name renderEdges
   * @params node
   * @returns jsx template
   */
  const renderEdges = (node: any) => {
    return (
      <>
        {Object.keys(node.edges).map((nodeID: any, i: any) => {
          const neighbor = node.edges[nodeID];
          /**
           * TODO:
           * determine which edge points to which node. top, left, bottom, right
           * match toNode with cellIndex
           */
          return <div
            className="grid-diagram--edge text-xs"
            key={i}
          >

            {/*'nodeid:' + nodeID + '-' + neighbor.weight*/}
            {nodeID + '.' + dPath[nodeID]}
          </div>
        })}
      </>
    )
  }

  return (
    <div>
      Finding Shortest Path *WIP
      <br/>
      <div className="grid-diagram w-max m-auto">
      {graph.nodes.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`grid-diagram--node${moveCellToNextline(graph.numNodes, width, cellIndex)}${cellAsObstacle(cell.obstacle)}${highlightCell(cellIndex)}`}
            style={{ width: pxSize + 'px', height: pxSize + 'px'}}
            onClick={() => addObstacle(cell.row, cell.column, cell.index)}
          >
            <span className="text-xs">last:{dPath[cellIndex]}</span>
            <br/>
            <span className="text-xs">node:{cellIndex}</span>
            <br></br>
            
            {/*renderEdges(cell)*/}
          </div>
        )
      })}
      </div>
    </div>
  )
}