"use client";

/**
 * recursion visualizer examples:
 * https://visualgo.net/en/recursion
 * https://recursion.vercel.app/
 */

import { useEffect, useState } from "react";
import { CallstackVisualizer } from "@/components";
import { Tree } from "@/utils/data_structures";

export default function CountAllSubsets() {
  const [ treeData, setTreeData ] = useState([] as any);
  const [ treePath, setTreePath ] = useState([] as number[]);

  const initialParent = 3;
  let parentCounter = initialParent;
  const tree = new Tree(initialParent);


  // CHANGE CODE HERE
  const decrease_and_conquer_count_all_subsets = (n: number) => {
    let result = 0;

    // insert to tree
    if (n != parentCounter) {
      tree.insert(parentCounter, n, null);
      setTreeData(tree);
    }
    setTreePath((prev) => [...prev, n]);
    parentCounter = n;
    // end

    if (n === 0) {
      result = 1;
    } else {
      // add fn in callstack
      result = 2 * decrease_and_conquer_count_all_subsets(n - 1);
    }

    // Backtracking
    // update tree
    // pops fn in callstack
    tree.find(n).value = result;
    setTreeData(tree);
    setTreePath((prev) => [...prev, n]);
    // end

    return result;
  }
  // END


  useEffect(() => {
    decrease_and_conquer_count_all_subsets(initialParent);
  }, []);
  

  return (
    <div>
      <CallstackVisualizer data={treeData} path={treePath} />
    </div>
  );
};