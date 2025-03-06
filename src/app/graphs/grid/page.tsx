"use client";

import "./styles.css";
import { Graph2 } from "@/utils/data_structures";
import { useState } from "react";

export default function Grid() {
  /**
   * @name makeGridGraph()
   * 
   * @param width 
   * @param height 
   * @returns graph class with total nodes
   */
  const makeGridGraph = (width: number, height: number) => {
    const numNodes = width * height;

    const g = new Graph2(numNodes, true);

    for (let r=0; r<height; r++) {
      for (let c=0; c<width; c++) {
        const index = r * width + c;

        if (c < width - 1) {
          g.insertEdge(index, index + 1, 1.0);
        }
        if (r < height - 1) {
          g.insertEdge(index, index + width, 1.0)
        }
      }
    }

    return g;
  }

  /**
   * @name computeNextRow()
   * 
   * @param {number} totalNodes
   * @param {number} columnsPerRow
   * @return {array_number} list of cell index that should be in next row/line
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


  const [ width, setWidth ] = useState(32);
  const [ height, setHeight ] = useState(20);
  const [ pxSize, setPxSize ] = useState(20);
  const gmap = makeGridGraph(width, height).nodes;

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
        add obstacles
      </div>
      
      <div className="grid-diagram w-fit">
      {gmap.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`grid-diagram--node${computeNextRow(gmap.length, width).includes(cellIndex) ? ' clear-left' : ''}`}
            style={{ width: pxSize + 'px', height: pxSize + 'px'}}
          >
          </div>          
        )
      })}
      </div>
    </div>
  )
}
