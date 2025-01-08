"use client";

import React from "react";

export interface Props {
  array?: number[];
  highlightIndices?: number[];
  highlightColor?: string;
  scanIndices?: number | null;
  scanColor?: string;
  highlightRegion?: number[];
  highlightRegionColor?: string;
}

export const ArrayVisualizer: React.FC<Props> = ({
  array = [],
  highlightIndices = [],
  highlightColor = "bg-rose-300",
  scanIndices,
  scanColor = "bg-green-600",
  highlightRegion = [],
  highlightRegionColor = "bg-neutral-600",
}) => {
  return (
    <div className="flex items-end justify-center">
      {array.map((num: number, index: number) => {
        return <div key={index} className="mx-0.5 text-center bg-white">
          <div className={`${highlightRegion.includes(index) ? highlightRegionColor : ''}`}>
            <div
              className={`
                ${highlightIndices.includes(index) ? highlightColor : ''}
              `}
              style={{height: `${num}vh`, width: "0.7vw"}}
            >
              <div className={`w-full h-full 
                ${scanIndices != null && scanIndices === index ? scanColor : ''}
              `}></div>
            </div>
          </div>
        </div>
      })}
    </div>
  );
}

export default ArrayVisualizer;