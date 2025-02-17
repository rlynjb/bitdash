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


  const deleteNode = async () => {
    if (deleteValue === "") return;
    
    const removeNode = parseInt(deleteValue);
    const removeNodeSuccessor = bst.successor(removeNode);

    await animateHighlight([removeNode]);

    bst.delete(removeNode);

    /**
     * if 15 is delete, 18 is its successor.
     * we cant just delete the node from array
     * find a way to swap 15 with 18
     * then, delete 15
     */
    const removeNodeIndex = bstNodes.findIndex(item => item === removeNode);
    const removeNodeSuccessorIndex = bstNodes.findIndex(item => item === removeNodeSuccessor);

    setBstNodes(prev => {
      const newVal = [...prev];
      newVal[removeNodeIndex] = newVal[removeNodeSuccessorIndex];
      newVal.splice(removeNodeSuccessorIndex, 1);
      return [...newVal]
    });
    
    setDeleteValue("");
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
            onClick={() => animateHighlight([bst.min()])}
          >
            Min
          </a>
          <a className="cursor-pointer m-2"
            onClick={() => animateHighlight([bst.max()])}
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