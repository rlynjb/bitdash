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

export default function InsertionSort() {
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
  const [scanIndices, setScanIndices] = useState(0);

  const insertionSort = async () => {
    for (let i=0; i<bars.length; i++) {
      const temp = bars[i];
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
        //
      }
    }
  }

  useEffect(() => {   
    insertionSort();

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
            <a className="cursor-pointer mr-2" onClick={insertionSort}>
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
