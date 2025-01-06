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
        return <div key={index} className="mx-0.5 text-center bg-white">
          <div
            key={index}
            className={`
              ${highlightIndices.includes(index) && !scanComplete ? highlightColor : ''}
            `}
            style={{height: `${num}vh`, width: "0.5vw"}}
          >
            <div className={`w-full h-full 
              ${scanIndices === index && !scanComplete ? scanColor : ''}
            `}></div>
          </div>
        </div>
      })}
    </div>
  );
}

export default ArrayVisualizer;