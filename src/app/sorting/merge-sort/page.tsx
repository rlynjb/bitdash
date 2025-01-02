"use client";

import React, { useState, useEffect } from "react";
import {
  generateArrayOfRandomNumbers
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
  }, [inputSize, speed]);

  /**
   * Use inside an async function > for loop
   * @returns Promise
   */
  const delayLoop = (delay: number = 1000) => new Promise((resolve) => setTimeout(resolve, delay));


  /**
   * Set generated random numbers
   */ 
  const [bars, setBars] = useState([] as number[]);
  useEffect(() => {
    setBars(generateArrayOfRandomNumbers(inputSize));
  }, []);


  /**
   * Run Algorithm
   */
  const [highlightIndices, setHighlightIndices] = useState([] as any[]);
  const [scanIndices, setScanIndices] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const mergeSort = () => {
    if (bars.length === 0) return;
    //setScanComplete(false);


    /**
     * TODO:
     * Look into how to animate recursive calls
     * 
     * Sample code below
     */
    /*
    const recursiveArrayFunction = async (arr: any[]) => {
      // Base case: if the array is empty, return
      if (arr.length === 0) return;
    
      // Do something with the first element of the array
      console.log(arr);
      setBars(arr);
      await delayLoop(speed);
    
      // Recursive call with the rest of the array
      recursiveArrayFunction(arr.slice(1));
    }
    
    const myArray = [1, 2, 3, 4, 5];
    recursiveArrayFunction(myArray);

    return
    */

    const divide = (A: number[], start: number, end: number): any => {
      // base case
      if (A.length === 0) return;
      if (start === end) return [A[start]];
      
      let midIndex = start + Math.floor((end - start) / 2);
      
      let left = divide(A, start, midIndex) as number[];
      let right = divide(A, midIndex + 1, end) as number[];

      console.log('divide', left, midIndex ,right)

      return combine(left, right);
    }

    const combine = (left: number[] = [], right: number[] = []) => {
      let i = 0, j = 0, merged_aux = [];
      
      while (i < left.length && j < right.length) {
        console.log([i,j])
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

      console.log('merged', merged_aux)
      setBars(merged_aux);
      return merged_aux;
    }

    console.log('input', bars)
    divide(bars, 0, bars.length - 1);
  }

  
  useEffect(() => {   
    mergeSort();
  }, []);


  return (
    <>
      <div className="absolute top-4 left-0 right-0 text-right">
        <ul className="list-none">
          <li>
            <BSelect label="input size:"
              options={inputSizeOptions}
              defaultValue={inputSize}
              onSelect={(val: any) => setInputSize(val)}
            />
          </li>
          <li>
            <BSelect label="speed:"
              options={speedOptions}
              defaultValue={speed}
              onSelect={(val: any) => setSpeed(val)}
            />
          </li>
          <li>
            runtime complexity
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
          scanComplete={scanComplete}
        />
      </div>
    </>
  );
}
