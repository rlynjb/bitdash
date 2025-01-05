"use client";

import React from "react";

export interface Props {
  array?: number[];
  highlightIndices?: any[];
  highlightColor?: string;
  scanIndices?: number;
  scanColor?: string;
  scanComplete?: boolean;
}

export const ArrayVisualizer: React.FC<Props> = ({
  array = [],
  highlightIndices = [],
  highlightColor = "bg-rose-300",
  scanIndices,
  scanColor = "bg-gray-400",
  scanComplete = false
}) => {
  return (
    <div className="flex items-end justify-center">
      {array.map((num: number, index: number) => {
        return <div key={index} className="text-center">
          <div
            key={index}
            className={`mx-0.5 bg-white array-bar 
              ${highlightIndices.includes(index) && !scanComplete ? highlightColor : ''} 
              ${scanIndices === index && !scanComplete ? scanColor : ''}
            `}
            style={{height: `${num}vh`, width: "0.5vw"}}
          >
          </div>
        </div>
      })}
    </div>
  );
}

export default ArrayVisualizer;