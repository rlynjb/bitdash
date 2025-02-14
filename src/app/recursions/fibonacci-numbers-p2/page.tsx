"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { BinaryVisualizer } from "@/components";
import { FibTree2 } from "@/utils/data_structures";


export default function FibonacciNumbers() {
  const [ treeData, setTreeData ] = useState([] as unknown);
  const [initialParent, setInitialParent ] = useState(5);
  const tree = new FibTree2(initialParent);

  const cache: any = {};

  /**
   * Algorithm to construct Fibonacci's tree with given minimum
   * https://stackoverflow.com/questions/56410140/algorithm-to-construct-fibonaccis-tree-with-given-minimum
   * https://visualgo.net/en/recursion
   */
  function top_down_divide_and_conquer_cache_find_fibonacci(n:number): number {
    if (n <= 1) {
      return n;
    }

    //if (cache[n]) {
      //console.log('n', n, cache[n])
      //return cache[n]
    //}

    //console.log('parent: ', n, 'left:', null, 'val', null, 'right:', null, 'val', null)
    tree.insert(n);

    const fib1 = top_down_divide_and_conquer_cache_find_fibonacci(n-1)
    const fib2 = top_down_divide_and_conquer_cache_find_fibonacci(n-2)

    //console.log('parent: ', n, 'left:', n-1, 'val', fib1, 'right:', n-2, 'val', fib2, '==', fib1 + fib2)
    tree.insertLeafRight(n, n-1, n-2)

    const val = fib1 + fib2;
    cache[n] = val;

    return val;
  }


  useEffect(() => {
    top_down_divide_and_conquer_cache_find_fibonacci(initialParent);
    setTreeData(tree);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialParent]);


  const increaseValue = () => {
    setInitialParent(prevVal => prevVal + 1);
  }

  const decreaseValue = () => {
    setInitialParent(prevVal => prevVal - 1);
  }

  return (
    <>
      <div className="absolute top-4 right-0 text-right z-10">
        Modify input:
        <a className="cursor-pointer m-2" onClick={decreaseValue}>
          --
        </a>
        {initialParent}
        <a className="cursor-pointer m-2" onClick={increaseValue}>
          ++
        </a>
      </div>
      
      <div className="absolute top-4" style={{ width: "-webkit-fill-available" }}>
        <BinaryVisualizer data={treeData} />
      </div>
    </>
  )
}