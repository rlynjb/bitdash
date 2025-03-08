"use client";

import "./styles.css";
import { Graph2 } from "@/utils/data_structures";
import { useState } from "react";

export default function Grid() {
  const [ width, setWidth ] = useState(25);
  const [ height, setHeight ] = useState(20);
  const [ pxSize, setPxSize ] = useState(25);
  const obstacles = {1:1, 2:2}


  /**
   * @name makeGridGraph()
   * 
   * @param {number} width 
   * @param {number} height 
   * @returns {object} graph class
   * 
   * @todo move this inside Graph2 possibly
   */
  const makeGridGraph = (width: number, height: number, obstacles?: any) => {
    const numNodes = width * height;
    const graph = new Graph2(numNodes, true);

    /**
     * isObstacle()
     * 
     * @param {number} row
     * @param {number} column
     * @param {Set} obstacles
     * @return {boolean}
     */
    const isObstacle = (row: any, column: any, obstacles: any): boolean => {
      return (row in obstacles) && obstacles[row] === column;
    }

    for (let r=0; r<height; r++) {
      for (let c=0; c<width; c++) {
        const index = r * width + c;

        if (!isObstacle(r, c, obstacles)) {
          if (c < width - 1 && !isObstacle(r, c+1, obstacles)) {
            graph.insertEdge(index, index + 1, 1.0);
          }
          if (r < height - 1 && !isObstacle(r+1, c, obstacles)) {
            graph.insertEdge(index, index + width, 1.0)
          }
        }

        graph.addNodeMatrice(index, r, c)
      }
    }
    return graph;
  }

  const gmap = makeGridGraph(width, height, obstacles);
  console.log(gmap)


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


  const addObstacle = (row?: any, column?: any) => {
    console.log('row', row, 'column', column)
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
        <br />
        obstacles
        <br />
        run BFS
      </div>
      
      <div className="grid-diagram w-fit">
      {gmap.nodes.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`grid-diagram--node${computeNextRow(gmap.numNodes, width).includes(cellIndex) 
              ? ' clear-left' 
              : ''} ${cell.isNodeObstacle() ? 'obstacle' : ''}`}
            style={{ width: pxSize + 'px', height: pxSize + 'px'}}
            onClick={() => addObstacle(cell.row, cell.column)}
          >
          </div>          
        )
      })}
      </div>
    </div>
  )
}
