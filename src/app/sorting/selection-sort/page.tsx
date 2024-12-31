"use client";

import React, { useState, useEffect } from "react";
import { selection_sort } from "@/utils/Algorithms/Sorting/";
import {
  generateArrayOfRandomNumbers
} from "@/utils";

export default function SelectionSort() {
  const [inputSize, setInputSize] = useState(70);
  const [speed, setSpeed] = useState(50);


  /**
   * Set generated random numbers
   */ 
  const [data, setData] = useState([] as number[]);
  useEffect(() => {
    setData(generateArrayOfRandomNumbers(inputSize));
  }, []);


  /**
   * Animate Unsorted data
   */
  // bars - manipulate and display data
  const [bars, setBars] = useState([] as number[]);

  useEffect(() => {
    // animate data as unsorted
    data.forEach((item, index) => {   
      setTimeout(() => {
        setBars(prevItem => [...prevItem, item]);
      }, (index + 1) * speed);
    });
  }, [data]);


  /**
   * Animate Sorted data
   */
  const runSort = () => {
    // animate data as sorted
    const sortedData = selection_sort(data);

    // replace each value in bars with sorted ones
    // scan through sortedData
    sortedData.forEach((sortedBar, sortedBarIndex) => {
      // set delay
      setTimeout(() => {
        // and render new sortedBar by using sortedBarIndex to
        // target index in bars
        setBars(prevBars => {
          prevBars[sortedBarIndex] = sortedData[sortedBarIndex]
          return [...prevBars]
        });
      }, (sortedBarIndex + 1) * speed);
    });

  };

  return (
    <>
      <div className="absolute top-4 left-0 right-0 text-right">
        <ul className="list-none">
          <li>
            input size:
          </li>
          <li>speed:</li>
          <li>
            runtime complexity
          </li>
          <li>
            <a
              className="cursor-pointer"
              onClick={runSort}
            >
              Run sort
            </a>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-4" style={{ width: "-webkit-fill-available" }}>
        <div className="flex items-end justify-center">
          {bars.map((num, index) => {
            return <div key={index} className="text-center">
              <div
                className={`mx-0.5 bg-white`}
                style={{height: `${num}vh`, width: "0.5vw"}}
              >
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}
