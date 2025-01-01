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

  const mergeSort = async () => {
    // Look into how to animate recursive calls

    return
    if (bars.length === 0) return;
    setScanComplete(false);

    const divide_recursive_tree = (A: number[], start: number, end: number): any => {
      // base case
      if (A.length === 0) return;
      if (start === end) return [A[start]];
      
      let midIndex = start + Math.floor((end - start) / 2);
      
      let left = divide_recursive_tree(A, start, midIndex) as number[];
      let right = divide_recursive_tree(A, midIndex + 1, end) as number[];
      
      console.log('left', left)
      console.log('right', right)

      combine(left, right);
    }

    const combine = async (left: number[] = [], right: number[] = []) => {
      let i = 0, j = 0, merged_aux = [];
      
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          merged_aux.push(left[i]);
          i++;

          setBars(merged_aux)
        } else {
          merged_aux.push(right[j]);
          j++;

          setBars(merged_aux)
        }
        await delayLoop(speed);
      }
      
      while (i < left.length) {
        merged_aux.push(left[i]);
        i++;

        await delayLoop(speed);
        setBars(merged_aux)
      }
      while (j < right.length) {
        merged_aux.push(right[j]);
        j++

        await delayLoop(speed);
        setBars(merged_aux)
      }
      
      //return merged_aux;

      setBars(merged_aux)
    }

    
    divide_recursive_tree(bars, 0, bars.length - 1)


    /*
    for (let i=0; i<bars.length; i++) {
      let temp = bars[i];
      let red = i-1;
      
      while(red >= 0 && bars[red] > temp) {
        bars[red+1] = bars[red];
        red--;

        setHighlightIndices([i]); // parent pointer, located lowest value
        setScanIndices(red);
        await delayLoop(speed);
      }
      bars[red+1] = temp;
      setBars([...bars]);

      if (i === bars.length-1) {
        setScanComplete(true);
      }
    }
    */
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
            <a className="cursor-pointer mr-2" onClick={mergeSort}>
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
