"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./styles.css";
import { useState } from "react";
import { BinaryVisualizer } from "@/components";
import { BinarySearchTree } from "@/utils/data_structures";
import { delayLoop } from "@/utils";


export default function BinarySearchTreePage() {
  const bst = new BinarySearchTree();
  const defaultValues = [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25];

  const [ bstNodes, setBstNodes ] = useState([...defaultValues] as number[]);

  const [ insertValue, setInsertValue ] = useState("" as any);
  const [ highlightNodes, setHighlightNodes ] = useState([] as any);

  const updateBST = () => {
    bstNodes.forEach((val: any) => {
      bst.insert(val);
    });
  }
  updateBST();


  /**
   * modify later when working with highlighting
   * multiple nodes
   */
  const animateHighlight = async () => {
    //if (highlightNodes.length === 0) return;
    await delayLoop(3000)
    setHighlightNodes([]);
  }


  const insert = () => {
    if (insertValue === "") return;
    
    const newVal = parseInt(insertValue);
    setBstNodes((prev) => {
      return [...prev, newVal]
    })
    setHighlightNodes([newVal]);
    setInsertValue("");

    animateHighlight();
  }

  const getMax = () => {
    setHighlightNodes([bst.max()]);

    animateHighlight();
  }

  const getMin = () => {
    setHighlightNodes([bst.min()]);

    animateHighlight();
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-center">
        <div className="mr-4">
          <input type="text"
            className="BInput bg-neutral-800 py-1 px-2 w-16"
            placeholder="node#"
            value={insertValue}
            onChange={e => setInsertValue(e.target.value)}
          />
          <a className="cursor-pointer m-2"
            onClick={insert}
          >
            Insert
          </a>
        </div>

        <div className="mr-4 py-1">
          <a className="cursor-pointer m-2"
            onClick={getMin}
          >
            Find Min
          </a>
          <a className="cursor-pointer m-2"
            onClick={getMax}
          >
            Find Max
          </a>
        </div>

        
        
        {/**
        <div className="mr-4">
          <input type="text" className="BInput bg-neutral-800 py-1 px-2 w-16" placeholder="node#" />
          <a className="cursor-pointer m-2"
          >
            Search
          </a>
        </div>

        <div>
          <input type="text" className="BInput bg-neutral-800 py-1 px-2 w-16" placeholder="node#" />
          <a className="cursor-pointer m-2"
          >
            Delete
          </a>
        </div>

        <div>
          <a className="cursor-pointer m-2">Find Min</a>
          <a className="cursor-pointer m-2">Find Max</a>
        </div>
        <a className="cursor-pointer m-2">Find Successor/Predecessor</a>
        <a className="cursor-pointer m-2">Traversals</a>
         */}
      </div>

      <div className="flex justify-center mt-8">
        <BinaryVisualizer data={bst} highlightNodes={highlightNodes} />
      </div>
    </div>
  );
};