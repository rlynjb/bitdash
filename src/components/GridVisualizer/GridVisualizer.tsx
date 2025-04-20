"use client";

import React from "react";

import "./styles.css";
import { Graph2 } from "@/utils/data_structures";
import { useState } from "react";

export interface Props {
  width?: number;
  height?: number;
  pxSize?: number;
  highlight?: any[];
}

export const GridVisualizer: React.FC<Props> = ({
  width = 20,
  height = 14,
  pxSize = 20,
  highlight = []
}) => {
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
            g.insertEdge(index, index + 1, 1.0);
          }
          if (r < height - 1 && !isObstacle(r+1, c, obstacles)) {
            g.insertEdge(index, index + width, 1.0)
          }
        }

        if (isObstacle(r, c, obstacles)) {
          g.markObstacle(index, true)
        }

        g.addNodeMatrice(index, r, c)
        
      }
    }
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

  return (
    <div>
      <div className="grid-diagram w-max m-auto">
      {graph.nodes.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`grid-diagram--node${moveCellToNextline(graph.numNodes, width, cellIndex)}${cellAsObstacle(cell.obstacle)}${highlightCell(cellIndex)}`}
            style={{ width: pxSize + 'px', height: pxSize + 'px'}}
            onClick={() => addObstacle(cell.row, cell.column, cell.index)}
          >
          </div>          
        )
      })}
      </div>
    </div>
  )
}

export default GridVisualizer;