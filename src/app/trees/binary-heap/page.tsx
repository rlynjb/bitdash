"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { delayLoop } from "@/utils";

import { BinaryVisualizer, LinearDataVisualizer } from "@/components";
import { MinHeap, CompleteBinaryTree } from "@/utils/data_structures";

/**
 * NOTE:
 * This is the first visualizer where algorithm is
 * separated from UI.
 * 
 * Algorithm (Heap) only spits out:
 * -- updated array
 * -- swap sequence
 */
export default function BinaryHeap() {
  const minheap = new MinHeap();

  const sample1 = [77, 15, 91, 21, 6, 46]; // Output: [6, 15, 46, 77, 21, 91]
  const sample2 = [5, 10, 3, 12, 1]; // Output: [1, 3, 5, 12, 10]

  const [ sampleData, setSampleData ] = useState(sample1);

  const cbt = new CompleteBinaryTree(sampleData, 0);
  const [ highlightNodes, setHighlightNodes ] = useState([] as any);

  // init sample data
  sampleData.forEach((v: any) => {
    const assureValueIsInt = parseInt(v)
    minheap.insert(assureValueIsInt)
  });


  /**
   * @name satisfyHeapAndAnimateInUI()
   * 
   * @param {array_int} seq - array of swap sequence from Heap algorithm
   * @param {array_list_int} data
   * @update highlightNodes
   * @update swap values in sampleData
   */
  const satisfyHeapAndAnimateInUI = async (seq: any = [], data: any = []) => {
    for (let i=0; i < seq.length; i++) {
      await delayLoop(1000);

      let index1 = seq[i][0], val1 = data[seq[i][0]],
        index2 = seq[i][1], val2 = data[seq[i][1]];
      
      setHighlightNodes([ val1, val2 ])
      
      await delayLoop(2000);

      const temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
    }

    setHighlightNodes([])
  }
  

  /**
   * 2. when user adds new node
   * -- update sampleData only, triggers useEffect
   * -- that runs buildMinHeap()
   */
  const [ minHeapVal, setMinHeapVal ] = useState('' as any);

  const insertMinHeapNode = async () => {
    if (minHeapVal === '') return;

    minheap.insert(parseInt(minHeapVal))

    setSampleData(minheap.prevHeap);
    setHighlightNodes([parseInt(minHeapVal)]);

    await delayLoop(1000);
    
    setMinHeapVal('');
    satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
  }


  /**
   * 3. runs getMin() method in Heap class
   * -- no animation run, just simple updated Heap array
   */
  const extractMin = async () => {
    const extractMin = minheap.getMin();

    setHighlightNodes([extractMin])

    await delayLoop(2000)

    setSampleData(minheap.heap);

    // TODO: checkout swap and implement animation
    //satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);

    //const updatedHeap = minheap.heap;
    //setSampleData(updatedHeap)
  }
  

  return (
    <>
      <div className="heaps--controllers ml-4">
        <div className="b-field-container">
          <div className="inline-block border border-zinc-800 mr-2">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => satisfyHeapAndAnimateInUI(minheap.swapSequence, sampleData)}
            >
              MinHeap
            </a>
          </div>

          <div className="b-field-content">
            <input type="text"
              className="BInput w-16"
              placeholder="node#"
              value={minHeapVal}
              onChange={e => setMinHeapVal(e.target.value)}
            />
            <a className="b-button"
              onClick={insertMinHeapNode}
            >
              Insert
            </a>
          </div>

          <a className="inline-block border border-zinc-800 cursor-pointer py-1 px-2"
              onClick={() => extractMin()}
          >
            Extract Min
          </a>
        </div>

        {/**
        <div className="b-field-container">
          <div className="inline-block border border-zinc-800 mr-2">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => buildMinHeap()}
            >
              *MaxHeap
            </a>

            <span className="text-zinc-800">|</span>

            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => extractMin()}
            >
              *Extract Max
            </a>
          </div>

          <div className="b-field-content">
            <input type="text"
              className="BInput w-16"
              placeholder="node#"
              value={minHeapVal}
              onChange={e => setMinHeapVal(e.target.value)}
            />
            <a className="b-button"
              onClick={insertMinHeapNode}
            >
              *Insert
            </a>
          </div>
        </div>
         */}
      </div>

      <BinaryVisualizer data={cbt} highlightNodes={highlightNodes} />
      <div className="my-8"></div>
      <LinearDataVisualizer data={sampleData} highlightElements={highlightNodes} />
    </>
  )
}