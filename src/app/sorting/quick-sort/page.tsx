"use client";

import React, { useState, useEffect } from "react";
import {
  generateArrayOfRandomNumbers,
  delayLoop,
  generateRandomNumber
} from "@/utils";
import { ArrayVisualizer, BSelect } from "@/components"
import {
  inputSizeOptions,
  speedOptions,
  defaultInputSize,
  defaultSpeed,
} from "@/const/options";

export default function QuickSort() {
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
  const [highlightRegion, setHighlightRegion] = useState([] as number[]);
  const [scanIndices, setScanIndices] = useState(null as number | null);

  const quickSort = () => {
    if (bars.length === 0) return;

    const swapHelper = (arr: number[], i1: number, i2: number) => {
      const temp = arr[i2];
      arr[i2] = arr[i1];
      arr[i1] = temp;
    }

    const divide_and_combine = async (arr: number[], start: number, end: number) => {
      // base case
      if (start >= end) return arr;


      /**
       * Highlight Range Indices
       */
      
      let highlightIndices = [];
      for (let i = start+1; i<=end; i++) {
        highlightIndices.push(i)
      }
      setHighlightRegion(highlightIndices);
      
      
      /**
       * Set random pivotIndex
       */
      const pivotIndex = generateRandomNumber(start, end);
      // and move pivot index to the 1st index by swapping values
      swapHelper(arr, start, pivotIndex);
      
      await delayLoop(speed);


      /**
       * Using pivotIndex value
       * scan through entire array and
       * place smaller values than pivotIndex to the left and
       * place larger values then pivotIndex to the right
       */
      let small = start;

      for (let big = start+1; big <= end; big++) {
        if (arr[big] < arr[start]) {
          small++;
          swapHelper(arr, big, small);

          setHighlightIndices(prevIndices => [...prevIndices, small]);
          await delayLoop(speed);
        }

        setScanIndices(big);
        await delayLoop(speed);
      }
      swapHelper(arr, small, start);
      
      setHighlightIndices([]);
      setHighlightRegion([]);
      setScanIndices(null);

      // divide using recursive
      await divide_and_combine(arr, start, small - 1);
      await divide_and_combine(arr, small + 1, end);
      
      return arr;
    }

    divide_and_combine(bars, 0, bars.length - 1)
  }

  
  useEffect(() => {   
    quickSort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="absolute top-4 left-0 right-0 text-right">
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
            runtime complexity
          </li>
          <li>
            <a className="cursor-pointer mr-2" onClick={() => quickSort()}>
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
          highlightRegion={highlightRegion}
        />
      </div>
    </>
  );
}
