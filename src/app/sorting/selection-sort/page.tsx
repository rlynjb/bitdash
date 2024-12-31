"use client";

import React, { useState, useEffect } from "react";
import { selection_sort } from "@/utils/Algorithms/Sorting/";
import {
  generateArrayOfRandomNumbers
} from "@/utils";
import { ArrayVisualizer } from "@/components"

export default function SelectionSort() {
  const [inputSize, setInputSize] = useState(20);
  const [speed, setSpeed] = useState(100);

  const delayLoop = () => new Promise((resolve) => setTimeout(resolve, speed));

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
  const [bars, setBars] = useState([] as number[]);

  const animateUnsortedArray = async () => {
    for (let i=0; i<data.length; i++) {
      setBars(prevItem => [...prevItem, data[i]]);
      await delayLoop();
    }
  }

  useEffect(() => {
    animateUnsortedArray();
  }, [data]);


  /**
   * Animate Sorted data
   */
  const [highlightIndices, setHighlightIndices] = useState([] as any[]);
  const [scanIndices, setScanIndices] = useState(0);

  const selectionSort = async () => {
    for (let t=0; t<bars.length; t++) {
      let minVal = bars[t];
      let minIndex = t;
      
      // scan from left to right to find lowest value
      for (let a = t+1; a <bars.length; a++) {
        if (bars[a] < minVal) {
          minVal = bars[a]
          minIndex = a;
        }
        setHighlightIndices([t, minIndex]); // parent pointer, located lowest value
        setScanIndices(a);
        await delayLoop();
      }
  
      [bars[t], bars[minIndex]] = [bars[minIndex], bars[t]];
      setBars([...bars]);
    }
  }

  useEffect(() => {   
    selectionSort()
  }, []);


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
              onClick={selectionSort}
            >
              Run sort
            </a>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-4" style={{ width: "-webkit-fill-available" }}>
        <ArrayVisualizer array={bars} highlightIndices={highlightIndices} scanIndices={scanIndices} />
      </div>
    </>
  );
}
