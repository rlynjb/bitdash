"use client";

import React from "react";
import "./styles.css";

export interface Props {
  array?: number[];
  highlightIndices?: any[];
  scanIndices?: number;
}

export const ArrayVisualizer: React.FC<Props> = ({array = [], highlightIndices = [], scanIndices = 0}) => {
  return (
    <div className="flex items-end justify-center">
      {array.map((num: number, index: number) => {
        return <div key={index} className="text-center">
          <div
            key={index}
            className={`mx-0.5 bg-white 
              ${highlightIndices.includes(index) ? 'highlighted' : ''} 
              ${scanIndices === index ? 'scanned' : ''}`}
            style={{height: `${num}vh`, width: "0.5vw"}}
          >
          </div>
        </div>
      })}
    </div>
  );
}

export default ArrayVisualizer;