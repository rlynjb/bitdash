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
  const [ treeData, setTreeData ] = useState([] as unknown);
  const [initialParent, setInitialParent ] = useState(3);
  let parentCounter = initialParent;
  const tree = new Tree(initialParent);


  // CHANGE CODE HERE
  const decrease_and_conquer_count_all_subsets = (n: number) => {
    let result = 0;

    /**
     * Build Tree
     * avoid re-inserting parent node as child node in same level
     * and check if node does not exist
     */
    if (n != parentCounter && !tree.find(n)) {
      tree.insert(parentCounter, n);
    }
    parentCounter = n;

    if (n === 0) {
      result = 1;
    } else {
      // add fn in callstack
      result = 2 * decrease_and_conquer_count_all_subsets(n - 1);
    }

    // pops fn in callstack
    tree.find(n).value = result;

    return result;
  }
  // END


  useEffect(() => {
    decrease_and_conquer_count_all_subsets(initialParent);
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