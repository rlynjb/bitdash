"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { delayLoop } from "@/utils";

import { BinaryVisualizer, LinearDataVisualizer } from "@/components";
import { MinHeap, MaxHeap, CompleteBinaryTree } from "@/utils/data_structures";

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
  const maxheap = new MaxHeap();
  const [ heapType, setHeapType ] = useState('');

  const sample1 = [77, 15, 91, 21, 6, 46]; // Output: [6, 15, 46, 77, 21, 91]
  const sample2 = [5, 10, 3, 12, 1]; // Output: [1, 3, 5, 12, 10]

  const [ sampleData, setSampleData ] = useState(sample1);

  const cbt = new CompleteBinaryTree(sampleData, 0);
  const [ highlightNodes, setHighlightNodes ] = useState([] as any);


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


  const initMinHeap = () => {
    // init sample data, defualt is MinHeap
    sampleData.forEach((v: any) => {
      const assureValueIsInt = parseInt(v)
      minheap.insert(assureValueIsInt)
    });
  }


  const initMaxHeap = () => {
    // init sample data, defualt is MaxHeap
    sampleData.forEach((v: any) => {
      const assureValueIsInt = parseInt(v)
      maxheap.insert(assureValueIsInt)
    });
  }


  const enableHeap = (type: string = '') => {
    setHeapType(type)

    if (type === 'minheap') {
      initMinHeap();
      satisfyHeapAndAnimateInUI(minheap.swapSequence, sampleData)
    }

    if (type === 'maxheap') {
      initMaxHeap();
      satisfyHeapAndAnimateInUI(maxheap.swapSequence, sampleData)
    }
  }
  

  /**
   * 2. when user adds new node
   * -- update sampleData only, triggers useEffect
   * -- that runs buildMinHeap()
   */
  const [ minHeapVal, setMinHeapVal ] = useState('' as any);
  const [ maxHeapVal, setMaxHeapVal ] = useState('' as any);

  const insertMinHeapNode = async () => {
    if (minHeapVal === '') return;

    initMinHeap();

    minheap.insert(parseInt(minHeapVal))

    setSampleData(minheap.prevHeap);
    setHighlightNodes([parseInt(minHeapVal)]);

    await delayLoop(1000);
    
    setMinHeapVal('');
    satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
  }

  const insertMaxHeapNode = async () => {
    if (maxHeapVal === '') return;

    initMaxHeap();

    maxheap.insert(parseInt(maxHeapVal))

    setSampleData(maxheap.prevHeap);
    setHighlightNodes([parseInt(maxHeapVal)]);

    await delayLoop(1000);
    
    setMaxHeapVal('');
    satisfyHeapAndAnimateInUI(maxheap.swapSequence, maxheap.prevHeap);
  }


  /**
   * 3. runs getMin() method in Heap class
   * -- no animation run, just simple updated Heap array
   */
  const extractMin = async () => {
    initMinHeap();
    const extractMin = minheap.getMin();

    setHighlightNodes([extractMin])

    await delayLoop(2000)

    setSampleData(minheap.heap);

    // TODO: checkout swap, dryrun heapifyDown, and implement animation
    //satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
  }

  const extractMax = async () => {
    initMaxHeap();
    const extractMax = maxheap.getMax();

    setHighlightNodes([extractMax])

    await delayLoop(2000)

    setSampleData(maxheap.heap);

    // TODO: checkout swap, dryrun heapifyDown, and implement animation
    //satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
  }
  

  return (
    <>
      <div className="heaps--controllers ml-4">
        <div className="b-field-container">
          <div className="inline-block border border-zinc-800 mr-2">
            <a className={`"inline-block py-1 px-2 " ${heapType === 'minheap' ? "disabled" : "cursor-pointer"}`}
              onClick={() => enableHeap('minheap')}
            >
              MinHeap
            </a>

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
        </div>

        <div className="b-field-container">
          <div className="inline-block border border-zinc-800 mr-2">
            <a className={`"inline-block py-1 px-2 " ${heapType === 'maxheap' ? "disabled" : "cursor-pointer"}`}
              onClick={() => enableHeap('maxheap')}
            >
              MaxHeap
            </a>

            <div className="b-field-content">
              <input type="text"
                className="BInput w-16"
                placeholder="node#"
                value={maxHeapVal}
                onChange={e => setMaxHeapVal(e.target.value)}
              />
              <a className="b-button"
                onClick={insertMaxHeapNode}
              >
                Insert
              </a>
            </div>

            <a className="inline-block border border-zinc-800 cursor-pointer py-1 px-2"
                onClick={() => extractMax()}
            >
              Extract Max
            </a>
          </div>
        </div>
      </div>

      <BinaryVisualizer data={cbt} highlightNodes={highlightNodes} />
      <div className="my-8"></div>
      <LinearDataVisualizer data={sampleData} highlightElements={highlightNodes} />
    </>
  )
}