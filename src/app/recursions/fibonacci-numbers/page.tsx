"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { CallstackVisualizer } from "@/components";
import { Tree } from "@/utils/data_structures";

export default function FibonacciNumbers() {
  const [ treeData, setTreeData ] = useState([] as unknown);
  const [initialParent, setInitialParent ] = useState(4);
  let parentCounter = initialParent;
  const tree = new Tree(initialParent, null, `fn(${initialParent}-1, 0, 0 + 1)`);


  function bottom_up_decrease_and_conquer_find_fibonacci(n:number, b1:number = 0, b2:number = 1): number {
    /**
     * Build Tree
     */
    if (n != parentCounter && !tree.find(n)) {
      tree.insert(
        parentCounter,
        n,
        (n == 0) && b1,
        (n !== 0) && `fn(${n}-1, ${b1}, ${b1} + ${b2})`
      );
    }
    parentCounter = n;


    if (n == 0) {
      return b1;
    } else {
      return bottom_up_decrease_and_conquer_find_fibonacci(n-1, b2, b1+b2);
    }
  }

  useEffect(() => {
    bottom_up_decrease_and_conquer_find_fibonacci(initialParent);
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
        <CallstackVisualizer data={treeData} />
      </div>
    </>
  );
};