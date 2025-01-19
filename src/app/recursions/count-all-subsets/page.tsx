"use client";

import { useEffect, useState } from "react";
import { CallstackVisualizer, type TreeNodeProp } from "@/components";
import { delayLoop } from "@/utils";

export default function CountAllSubsets() {
  const sample = [
    {
      n: 3,
      children: [
        {
          n: 2,
          children: [
            {
              n: 1,
              children: [
                {
                  n: 0
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  const [ callstack, setCallstack ] = useState(sample as TreeNodeProp[]);

  const decrease_and_conquer_count_all_subsets = async (n: number) => {
    let result = 0;

    await delayLoop(2000);
    console.log(n)

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