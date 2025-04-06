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
  const [ heapVal, setHeapVal ] = useState('' as any);

  const insertHeapNode = async () => {
    if (heapType === '') return;
    if (heapVal === '') return;

    if (heapType === 'minheap') {
      initMinHeap();
      minheap.insert(parseInt(heapVal))
      setSampleData(minheap.prevHeap);

      setHighlightNodes([parseInt(heapVal)]);

      await delayLoop(1000);
      
      setHeapVal('');
      satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
    }

    if (heapType === 'maxheap') {
      initMaxHeap();

      maxheap.insert(parseInt(heapVal))
  
      setSampleData(maxheap.prevHeap);
      setHighlightNodes([parseInt(heapVal)]);
  
      await delayLoop(1000);
      
      setHeapVal('');
      satisfyHeapAndAnimateInUI(maxheap.swapSequence, maxheap.prevHeap);
    }
  }


  /**
   * 3. runs getMin() method in Heap class
   * -- no animation run, just simple updated Heap array
   */
  const extractHeap = async () => {
    if (heapType === '') return;

    if (heapType === 'minheap') {
      initMinHeap();
      const extractMin = minheap.getMin();
  
      setHighlightNodes([extractMin])
  
      await delayLoop(2000)
  
      setSampleData(minheap.heap);
    }

    if (heapType === 'maxheap') {
      initMaxHeap();
      const extractMax = maxheap.getMax();
  
      setHighlightNodes([extractMax])
  
      await delayLoop(2000)
  
      setSampleData(maxheap.heap);
    }

    // TODO: checkout swap, dryrun heapifyDown, and implement animation
    //satisfyHeapAndAnimateInUI(minheap.swapSequence, minheap.prevHeap);
  }


  const operationLabel = (type: string = ''): string => {
    let res = type;

    switch(type) {
      case 'minheap':
        res = 'Min';
        break;
      case 'maxheap':
        res = 'Max';
        break;
      default:
        res = '';
    }

    return res;
  }

  const isType = (type: string = ''): boolean => {

    // default, select either Type first
    if (heapType === '' && ['minheap', 'maxheap'].includes(type)) {
      return false;
    }

    // disable or enable operation buttons
    if (heapType === '') {
      return true;
    }

    // toggle Type buttons when either is selected
    if (heapType === type) {
      return true;
    } else {
      return false;
    }
  }
  

  return (
    <>
      <div className="heaps--controllers ml-4">
        <div className="b-field-container">
          <span className="b-field-label">Type:</span>

          <div className="inline-block border border-zinc-800 mr-2">
            <a className={`inline-block py-1 px-2 ${isType('minheap') ? "disabled" : "cursor-pointer"}`}
              onClick={() => enableHeap('minheap')}
            >
              MinHeap
            </a>
            <span className="b-separate">|</span>
            <a className={`inline-block py-1 px-2 ${isType('maxheap') ? "disabled" : "cursor-pointer"}`}
              onClick={() => enableHeap('maxheap')}
            >
              MaxHeap
            </a>
          </div>
        </div>

        <div className="b-field-container">
          <span className="b-field-label">Operations:</span>

          <div className="inline-block mr-2">
            <div className="b-field-content">
              <input type="text"
                className="BInput w-16"
                placeholder="node#"
                value={heapVal}
                onChange={e => setHeapVal(e.target.value)}
              />
              <a className={`b-button ${isType('') ? 'disabled' : 'cursir-pointer'}`}
                onClick={insertHeapNode}
              >
                Insert {operationLabel(heapType)}
              </a>
              <span className="b-separate">|</span>
              <a className={`b-button ${isType('') ? 'disabled' : 'cursir-pointer'}`}
                onClick={() => extractHeap()}
              >
                Extract {operationLabel(heapType)}
              </a>
            </div>
          </div>
        </div>
      </div>

      <BinaryVisualizer data={cbt} highlightNodes={highlightNodes} />
      <div className="my-2"></div>
      <LinearDataVisualizer data={sampleData} highlightElements={highlightNodes} />
    </>
  )
}