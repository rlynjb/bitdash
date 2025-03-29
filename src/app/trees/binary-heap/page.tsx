"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { delayLoop } from "@/utils";

import { BinaryVisualizer } from "@/components";
import { MinHeap, CompleteBinaryTree } from "@/utils/data_structures";


export default function BinaryHeap() {
  const minheap = new MinHeap();
  const sample1 = [77, 15, 91, 21, 6, 46]; // Output: [6, 15, 46, 77, 21, 91]
  const sample2 = [5, 10, 3, 12, 1]; // Output: [1, 3, 5, 12, 10]

  sample1.forEach(v => minheap.insert(v));

  const cbt = new CompleteBinaryTree(sample1, 0);

  const [ highlightNodes, setHighlightNodes ] = useState([] as any);


  const animate = async () => {
    const seq = minheap.swapSequence;

    for (let i=0; i < seq.length; i++) {
      await delayLoop(2000);

      let index1 = seq[i][0], val1 = sample1[seq[i][0]],
        index2 = seq[i][1], val2 = sample1[seq[i][1]];

      console.log(i, " ----- ", [ val1, val2 ])
      
      setHighlightNodes([ val1, val2 ])
      // swap - 2sec
    }
  }

  useEffect(() => {
    animate();
  }, []);
  

  //console.log('min heap after:', minheap.heap)


  return (
    <>
      Binary Heap<br/>*WIP*

      <BinaryVisualizer data={cbt} highlightNodes={highlightNodes} />
    </>
  )
}