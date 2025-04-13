"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { generateArrayOfRandomNumbers, delayLoop } from "@/utils";

import { MinHeap, MaxHeap } from "@/utils/data_structures";
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
  const minheap = new MinHeap();

  /**
   * @name satisfyHeapAndAnimateInUI()
   * 
   * @param {array_int} seq - list of array of index
   * @param {array_list_int} data - list of unsorted data
   * @update highlightNodes
   * @update swap values in sampleData
   */
  const satisfyHeapAndAnimateInUI = async (seq: any = [], data: any = []) => {
    for (let i=0; i < seq.length; i++) {
      await delayLoop(defaultSpeed);

      let index1 = seq[i][0], val1 = data[seq[i][0]],
        index2 = seq[i][1], val2 = data[seq[i][1]];
      
      setHighlightIndices([ val1, val2 ])
      
      await delayLoop(defaultSpeed);

      const temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
    }

    setHighlightIndices([])
  }


  const minHeapsort = async () => {
    // build heap
    bars.forEach((v) => minheap.insert(v))

    await satisfyHeapAndAnimateInUI(minheap.swapSequence, bars)
    
    //const output = [];

    for (let i=0; i<bars.length; i++) {
      //output.push(minheap.getMin());

      //const newArr = [...bars] as any;
      //newArr[i] = minheap.getMin();
      //setBars(newArr)
      bars[i] = minheap.getMin() as any;
      await delayLoop(defaultSpeed);
    }

    console.log('after', bars)
    console.log(minheap)
    
    //setBars(minheap.heap)
  }


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
            <a className="cursor-pointer mr-2" onClick={minHeapsort}>
              Run Min Heapsort
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
        />
      </div>
    </>
  )
}
