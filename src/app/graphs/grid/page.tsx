"use client";

import "./styles.css";
import { Graph2 } from "@/utils/data_structures";
import { useState } from "react";

export default function Grid() {
  const [ width, setWidth ] = useState(25);
  const [ height, setHeight ] = useState(15);
  const [ pxSize, setPxSize ] = useState(25);
  const [obstacles, setObstacles] = useState([
    {row: 0, column: 0},
    {row: 1, column: 1},
    {row: 2, column: 2},
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
  console.log(graph)


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


  // =============================================


  /**
   * @name decrease()
   * 
   * @param {string} field 'width | height | px'
   * @return increases value using setWidth | setHeight | setPxSize
   */
  const decrease = (field: string) => {
    switch (field) {
      case 'width':
        setWidth(width - 1);
        break;
      case 'height':
        setHeight(height - 1);
        break;
      case 'px':
        setPxSize(pxSize - 1);
        break;
    }
  }

  /**
   * @name increase()
   * 
   * @param {string} field 'width | height | px'
   * @return decreases value using setWidth | setHeight | setPxSize
   */
  const increase = (field: string) => {
    switch (field) {
      case 'width':
        setWidth(width + 1);
        break;
      case 'height':
        setHeight(height + 1);
        break;
      case 'px':
        setPxSize(pxSize + 1);
        break;
    }
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
    setObstacles((prev) => [...prev, {row, column}])
  }


  return (
    <div className="relative flex justify-center mt-4 px-[1em]">
      <div className="absolute left-5">
        <div className="b-field-container">
          <label className="b-field-label">width:</label>
          <div className="b-field-content py-1">
            <a onClick={() => decrease('width')}>--</a>
            {width}
            <a onClick={() => increase('width')}>++</a>
          </div>
        </div>
        <div className="b-field-container">
          <label className="b-field-label">height:</label>
          <div className="b-field-content py-1">
            <a onClick={() => decrease('height')}>--</a>
            {height}
            <a onClick={() => increase('height')}>++</a>
          </div>
        </div>
        <div className="b-field-container">
          <label className="b-field-label">px:</label>
          <div className="b-field-content py-1">
            <a onClick={() => decrease('px')}>--</a>
            {pxSize}
            <a onClick={() => increase('px')}>++</a>
          </div>
        </div>
        {/*
        <br />
        obstacles
        <br />
        run BFS
        */}
      </div>
      
      <div className="grid-diagram w-fit">
      {graph.nodes.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`grid-diagram--node${computeNextRow(graph.numNodes, width).includes(cellIndex) 
              ? ' clear-left' 
              : ''} ${cell.obstacle ? 'obstacle' : ''}`}
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
