"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { generateArrayOfRandomNumbers, delayLoop } from "@/utils";

import { MinHeap, MaxHeap, CompleteBinaryTree } from "@/utils/data_structures";
import { ArrayVisualizer, BSelect } from "@/components"

import {
  inputSizeOptions,
  speedOptions,
  defaultInputSize,
  defaultSpeed,
} from "@/const/options";

export default function HeapSort() {
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

  const minheap = new MinHeap();

  const heapSort = () => {
    //
  }

  useEffect(() => {   
    bars.forEach((v) => {
      minheap.insert(v)
    })

    console.log(minheap)

    heapSort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bars]);

  return (
    <>
      <div className="absolute top-4 right-0 text-right">
        <ul className="list-none">
          <li>
            time complexity: O(n^2) <span className="text-xs">avg/worst case</span>
            <br/>
            O(n) <span className="text-xs">best case</span>
          </li>
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
            <a className="cursor-pointer mr-2" onClick={heapSort}>
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
  )
}
