"use client";

import React, { useState, useEffect } from "react";
import {
  generateArrayOfRandomNumbers,
  delayLoop
} from "@/utils";
import { ArrayVisualizer, BSelect } from "@/components"
import {
  inputSizeOptions,
  speedOptions,
  defaultInputSize,
  defaultSpeed,
} from "@/const/options";

export default function MergeSort() {
  const [inputSize, setInputSize] = useState(defaultInputSize);
  const [speed, setSpeed] = useState(defaultSpeed);

  /**
   * Control stuff
   * Trigger reset
   */
  const reset = () => {
    setBars([]);
    setBars(generateArrayOfRandomNumbers(inputSize));
  }

  useEffect(() => {
    reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSize, speed]);


  /**
   * Set generated random numbers
   */ 
  const [bars, setBars] = useState([] as number[]);
  useEffect(() => {
    setBars(generateArrayOfRandomNumbers(inputSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /**
   * Run Algorithm
   */
  const [highlightIndices, setHighlightIndices] = useState([] as number[]);
  const [scanIndices, setScanIndices] = useState(null as null | number);

  const mergeSort = () => {
    if (bars.length === 0) return;

    const divide = async (A: number[], start: number, end: number) => {
      if (A.length === 0) return;
      if (start === end) return [A[start]];
      
      const midIndex = start + Math.floor((end - start) / 2);
      const left = await divide(A, start, midIndex) as number[];
      const right = await divide(A, midIndex + 1, end) as number[];

      return await combine(left, right, midIndex);
    }

    const combine = async (left: number[] = [], right: number[] = [], midIndex: number) => {
      let i = 0, j = 0;
      const merged_aux = [];
      
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          merged_aux.push(left[i]);
          i++;

        } else {
          merged_aux.push(right[j]);
          j++;
        }
      }
      
      while (i < left.length) {
        merged_aux.push(left[i]);
        i++;
      }

      while (j < right.length) {
        merged_aux.push(right[j]);
        j++;
      }
    
      await updateOriginalArray(midIndex, left.length, right.length, merged_aux)
      await delayLoop(speed);

      setHighlightIndices([]);
      setScanIndices(null);
      
      return merged_aux;
    }

    divide(bars, 0, bars.length - 1)
  }


  /**
   * @param {number} midIndex
   * @param {number} leftSize
   * @param {number} rightSize
   * @param {number[]} combineArray
   * @returns it updates originalArray (bars) reactivity
   */
  const updateOriginalArray = async (
    midIndex: number,
    leftSize: number,
    rightSize: number,
    combineArray: number[],
  ) => {
    const startIndex = midIndex - (leftSize - 1);
    const endIndex = midIndex + rightSize;


    /**
     * Highlight Range Indices
     */
    const highlightIndices = [];
    for (let i = startIndex; i<=endIndex; i++) {
      highlightIndices.push(i)
    }
    setHighlightIndices(highlightIndices);


    /**
     * Scan though range and 
     * stick within merged array length
     */
    const copyCombineArray = [...combineArray];

    for (let i=startIndex; i<=endIndex; i++) {
      setScanIndices(i)

      const popElement = copyCombineArray.shift() as number;

      setBars(prevBars => {
        const newBars = [...prevBars];

        // option1
        newBars[i] = popElement;

        // option2 - this doesnt get animated tho, but it sorts it out
        //newBars.splice(startIndex, highlightIndices.length, ...combineArray);
        return newBars;
      });

      await delayLoop(100); 
    }
  }

  
  useEffect(() => {   
    mergeSort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="absolute top-4 right-0 text-right">
        <ul className="list-none">
          <li>
            <BSelect label="input size:"
              options={inputSizeOptions}
              defaultValue={inputSize}
              onSelect={(val: number) => setInputSize(val)}
            />
          </li>
          <li>
            <BSelect label="speed:"
              options={speedOptions}
              defaultValue={speed}
              onSelect={(val: number) => setSpeed(val)}
            />
          </li>
          <li>
            <a className="cursor-pointer mr-2" onClick={() => mergeSort()}>
              Run
            </a>
            | 
            <a className="cursor-pointer ml-2" onClick={reset}>
              Reset
            </a>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-4" style={{ width: "-webkit-fill-available" }}>
        <ArrayVisualizer
          array={bars}
          highlightIndices={highlightIndices}
          scanIndices={scanIndices}
        />
      </div>
    </>
  );
}
