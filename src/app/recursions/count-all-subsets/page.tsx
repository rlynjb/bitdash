"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { CallstackVisualizer } from "@/components";
import { delayLoop } from "@/utils";
import { Tree } from "@/utils/data_structures";

export default function CountAllSubsets() {
  const [ treePath, setTreePath ] = useState([] as any);
  const speed = 2000;

  const initialParent = 3;
  let parentCounter = initialParent;
  const tree = new Tree(initialParent);

  const update = async() => {
    setTreePath(tree);
  }


  const decrease_and_conquer_count_all_subsets = async (n: number) => {
    let result = 0;

    // Delay and insert to tree
    await delayLoop(speed);
    if (n != parentCounter) {
      tree.insert(parentCounter, n, null);
      //setTreePath(tree)
      await update();
    }
    console.log('treePath#', n, tree)
    parentCounter = n;
    // end

    if (n === 0) {
      result = 1;
    } else {
      // add fn in callstack
      result = 2 * await decrease_and_conquer_count_all_subsets(n - 1);
    }

    // Backtracking
    // Delay and update tree
    await delayLoop(speed);
    // pops fn in callstack
    tree.find(n).value = result;
    //setTreePath(tree);
    await update();
    console.log('treePath#', n, 'value:', result, tree)
    // end

    return result;
  }

  useEffect(() => {
    decrease_and_conquer_count_all_subsets(initialParent);
  }, []);

  useEffect(() => {
    console.log('callstack', treePath)
  }, [treePath]);
  

  return (
    <div>
      <CallstackVisualizer data={treePath} />
    </div>
  );
};