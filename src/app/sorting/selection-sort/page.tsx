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

export default function SelectionSort() {
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

  const selectionSort = async () => {
    setScanComplete(false);

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
        await delayLoop(speed);
      }
  
      [bars[t], bars[minIndex]] = [bars[minIndex], bars[t]];
      setBars([...bars]);

      if (t === bars.length-1) {
        setScanComplete(true);
      }
    }
  }

  useEffect(() => {   
    selectionSort();
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
            <a className="cursor-pointer mr-2" onClick={selectionSort}>
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
