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
  const [ deleteValue, setDeleteValue ] = useState("" as any);
  const [ highlightNodes, setHighlightNodes ] = useState([] as any);

  const buildDefaultBst = () => {
    bstNodes.forEach((val: any) => {
      bst.insert(val);
    });
  }
  buildDefaultBst();


  /**
   * TODO:
   * modify later when working with highlighting
   * multiple nodes
   */
  const animateHighlight = async (nodes: any[]) => {
    setHighlightNodes(nodes);
    //if (highlightNodes.length === 0) return;
    await delayLoop(3000)
    setHighlightNodes([]);
  }


  const insertNode = () => {
    if (insertValue === "") return;
    
    const newVal = parseInt(insertValue);
    setBstNodes((prev) => {
      return [...prev, newVal]
    })
    setInsertValue("");

    animateHighlight([newVal]);
  }

  const getMax = () => {
    animateHighlight([bst.max()]);
  }

  const getMin = () => {
    animateHighlight([bst.min()]);
  }

  const deleteNode = () => {
    if (deleteValue === "") return;
    
    const val = parseInt(deleteValue);
    console.log(val)

    // delete in bst
    // delete in bstNodes
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
            onClick={insertNode}
          >
            Insert
          </a>
        </div>

        {/*
        <div className="mr-4">
          <input type="text" className="BInput bg-neutral-800 py-1 px-2 w-16" placeholder="node#" />
          <a className="cursor-pointer m-2"
          >
            Search
          </a>
        </div>
        */}

        <div className="mr-4">
          <input type="text"
            className="BInput bg-neutral-800 py-1 px-2 w-16"
            placeholder="node#"
            value={deleteValue}
            onChange={e => setDeleteValue(e.target.value)}
          />
          <a className="cursor-pointer m-2"
            onClick={deleteNode}
          >
            Delete
          </a>
        </div>

        <div className="mr-4 py-1">
          <span className="text-gray-400 text-xs">Find:</span>
          <a className="cursor-pointer m-2"
            onClick={getMin}
          >
            Min
          </a>
          <a className="cursor-pointer m-2"
            onClick={getMax}
          >
            Max
          </a>
          {/*
            <a className="cursor-pointer m-2">Successor</a>
            <a className="cursor-pointer m-2">Predecessor</a> 
          */}
        </div>
        
        {/*
        <div>
          <b>Traverse:</b>
          <a className="cursor-pointer m-2">Preorder</a>
          <a className="cursor-pointer m-2">Inorder</a>
          <a className="cursor-pointer m-2">Postorder</a>
        </div>
         */}
      </div>

      <div className="flex justify-center mt-8">
        <BinaryVisualizer data={bst} highlightNodes={highlightNodes} />
      </div>
    </div>
  );
};