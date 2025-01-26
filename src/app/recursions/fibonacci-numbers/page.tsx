"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { CallstackVisualizer } from "@/components";
import { Tree } from "@/utils/data_structures";
import { delayLoop } from "@/utils";

export default function FibonacciNumbers() {
  const [ treeData, setTreeData ] = useState([] as any);
  const [ treePath, setTreePath ] = useState([] as number[]);

  const initialParent = 8;
  let parentCounter = initialParent;
  const tree = new Tree(initialParent);


  // CHANGE CODE HERE
  const bottom_up_decrease_and_conquer_find_fibonacci = (n:number, b1:number = 0, b2:number = 1): number => {
    console.log(n)

    if (n == 0) {
      console.log(b1)
      return b1;
    } else {
      const result = bottom_up_decrease_and_conquer_find_fibonacci(n-1, b2, b1+b2);
      console.log(n-1, ' - ', b2, ' - ', b1+b2)
      return result;
    }
  }
  // END


  /**
   * NOTE:
   * to contruct a legit Tree data structure,
   * - need to learn Trees and Traversals
   * ref: https://stackoverflow.com/questions/56410140/algorithm-to-construct-fibonaccis-tree-with-given-minimum
   * 
   * Done:
   * - implement Tree and TreeNode ADT
   * - intro to how Trees DS co-exist with Recursion & Backtracking
   */
  const cache: any = {};

  const top_down_divide_and_conquer_cache_find_fibonacci = async (n:number): Promise<any> => {
    await delayLoop(2000);
    
    console.log(n)

    // Write your code here.
    if (n <= 1) return n;
    if (cache[n]) {
      await delayLoop(2000);

      console.log(n, ':', cache[n])
      return cache[n]
    }
    let val = await top_down_divide_and_conquer_cache_find_fibonacci(n-1) + await top_down_divide_and_conquer_cache_find_fibonacci(n-2);
    cache[n] = val;

    await delayLoop(2000);
    console.log('cache -- ', cache)
    console.log('cs#',n,':', val)
    return val;
  }


  useEffect(() => {
    bottom_up_decrease_and_conquer_find_fibonacci(initialParent);
    //top_down_divide_and_conquer_cache_find_fibonacci(initialParent);
  }, []);
  

  return (
    <div>
      <CallstackVisualizer data={treeData} path={treePath} />
    </div>
  );
};