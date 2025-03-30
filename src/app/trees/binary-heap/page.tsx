"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { delayLoop } from "@/utils";

import { BinaryVisualizer } from "@/components";
import { MinHeap, CompleteBinaryTree } from "@/utils/data_structures";


export default function BinaryHeap() {
  const sample1 = [77, 15, 91, 21, 6, 46]; // Output: [6, 15, 46, 77, 21, 91]
  const sample2 = [5, 10, 3, 12, 1]; // Output: [1, 3, 5, 12, 10]
  const [ sampleData, setSampleData ] = useState(sample1);

  const cbt = new CompleteBinaryTree(sampleData, 0);
  const [ highlightNodes, setHighlightNodes ] = useState([] as any);


  /**
   * @name animate()
   * 
   * @param {array_int} seq - array of swap sequence from Heap algorithm
   * @update highlightNodes
   * @update swap values in sampleData
   */
  const animate = async (seq: any = []) => {
    for (let i=0; i < seq.length; i++) {
      await delayLoop(2000);

      let index1 = seq[i][0], val1 = sampleData[seq[i][0]],
        index2 = seq[i][1], val2 = sampleData[seq[i][1]];
      
      setHighlightNodes([ val1, val2 ])
      
      await delayLoop(1000);

      const temp = sampleData[index1];
      sampleData[index1] = sampleData[index2];
      sampleData[index2] = temp;
    }

    setHighlightNodes([])
  }

  /*
  NOTE: only use this when initially running the function
  useEffect(() => {
    animate();
  }, []);
  */

  const runMinHeap = () => {
    const minheap = new MinHeap();
    sampleData.forEach(v => minheap.insert(v));
    animate(minheap.swapSequence);
  }

  const runMaxHeap = () => {
    //
  }
  

  return (
    <>
      <div className="heaps--controllers ml-4">
        <div className="b-field-container">
          <span className="b-field-label">Operations:</span>

          <div className="inline-block border border-zinc-800 mr-2">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => runMinHeap()}
            >
              MinHeap
            </a>
            <span className="text-zinc-800">|</span>
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => runMaxHeap()}
            >
              MaxHeap
            </a>
          </div>
        </div>
      </div>

      <BinaryVisualizer data={cbt} highlightNodes={highlightNodes} />
    </>
  )
}