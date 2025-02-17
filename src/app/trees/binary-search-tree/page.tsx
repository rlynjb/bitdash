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

  const [ operationVal, setOperationVal ] = useState("" as any);
  const [ findVal, setFindVal ] = useState("" as any);
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
    if (operationVal === "") return;
    
    const newVal = parseInt(operationVal);
    setBstNodes((prev) => {
      return [...prev, newVal]
    })
    setOperationVal("");

    animateHighlight([newVal]);
  }

  const searchNode = () => {
    if (operationVal === "") return;
    
    const searchVal = parseInt(operationVal);
    
    setOperationVal("");

    animateHighlight([bst.search(searchVal).key]);
  }

  const deleteNode = async () => {
    if (operationVal === "") return;
    
    const removeNode = parseInt(operationVal);
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
    
    setOperationVal("");
  }

  const findSuccessor = async () => {
    if (findVal === "") return;

    const suc = bst.successor(parseInt(findVal));

    setFindVal("");

    await animateHighlight([suc]);
  }

  const findPredecessor = async () => {
    if (findVal === "") return;

    const pre = bst.predecessor(parseInt(findVal));

    setFindVal("");

    await animateHighlight([pre]);
  }


  /**
   * TODO:
   * make Links/button reusable
   * make Fields reusable
   */
  return (
    <div className="flex flex-col mt-8">
      <div className="controllers ml-4 grid grid-cols-3">
        <div className="col-span-3">
          <span className="text-gray-400 text-xs mr-2">Operations:</span>
          <div className="inline-block mr-4 border border-zinc-800">
            <input type="text"
              className="BInput bg-neutral-800 py-1 px-2 w-16"
              placeholder="node#"
              value={operationVal}
              onChange={e => setOperationVal(e.target.value)}
            />
            <a className="cursor-pointer m-2"
              onClick={insertNode}
            >
              Insert
            </a>
            <a className="cursor-pointer m-2"
              onClick={searchNode}
            >
              Search
            </a>
            <a className="cursor-pointer m-2"
              onClick={deleteNode}
            >
              Delete
            </a>
          </div>
        </div>

        <div className="col-span-3 mr-4 mt-2">
          <span className="text-gray-400 text-xs mr-2">Find:</span>
          <a className="inline-block cursor-pointer mr-2 py-1 px-2 border border-zinc-800"
            onClick={() => animateHighlight([bst.min()])}
          >
            Min
          </a>
          <a className="inline-block cursor-pointer mr-2 py-1 px-2 border border-zinc-800"
            onClick={() => animateHighlight([bst.max()])}
          >
            Max
          </a>

          <div className="inline-block mr-2 border border-zinc-800">
            <input type="text"
              className="BInput bg-neutral-800 py-1 px-2 w-16"
              placeholder="node#"
              value={findVal}
              onChange={e => setFindVal(e.target.value)}
            />
            <a className="cursor-pointer m-2"
              onClick={findSuccessor}
            >
              Successor
            </a>
            <a className="cursor-pointer m-2"
              onClick={findPredecessor}
            >
              Predecessor
            </a>
          </div>
        </div>
        
        {/*
        <div>
          <b>Traversals:</b>
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