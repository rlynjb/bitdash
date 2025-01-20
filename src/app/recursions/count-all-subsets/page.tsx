"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { CallstackVisualizer, type TreeNodeProp } from "@/components";
import { delayLoop, buildTreeNestedArray } from "@/utils";

export default function CountAllSubsets() {
  const [ callstack, setCallstack ] = useState([] as TreeNodeProp[]);
  let treePath = [] as any[];

  /**
   * TODO:
   * - buildTreeNestedArray gets updated immediately
   * - we need to set delay timer for builTreeNestedArray as well
   * - look into why CallstackVisualizer is not updating
   */

  const decrease_and_conquer_count_all_subsets = async (n: number) => {
    let result = 0;

    await delayLoop(2000);
    console.log(n)

    treePath.push(n);
    setCallstack(buildTreeNestedArray(callstack, treePath, {id: n, children: []}));
    console.log('callstack - ', callstack)

    if (n === 0) {
      result = 1;
    } else {
      // add fn in callstack
      result = 2 * await decrease_and_conquer_count_all_subsets(n - 1);
    }

    // Backtracking
    await delayLoop(2000);
    // pops fn in callstack
    console.log(result);

    return result;
  }

  useEffect(() => {
    decrease_and_conquer_count_all_subsets(3);
  }, []);
  

  return (
    <div>
      <CallstackVisualizer data={callstack} />
    </div>
  );
};