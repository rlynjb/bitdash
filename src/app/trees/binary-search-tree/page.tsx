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


  const animateHighlight = async (nodes: any[]) => {
    if (nodes.length === 1) {
      setHighlightNodes(nodes);
      await delayLoop(3000)
      setHighlightNodes([]);

    } else {
      // animate

      setHighlightNodes([]);

      for (let i = 0; i < nodes.length; i++) {
        setHighlightNodes((prev: any) => [...prev, nodes[i]]);
        await delayLoop(1000)
      }
    }
    
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

  const preOrderTraversal = async () => {
    await animateHighlight(bst.preOrder());
  }

  const inOrderTraversal = async () => {
    await animateHighlight(bst.inOrder());
  }

  const postOrderTraversal = async () => {
    await animateHighlight(bst.postOrder());
  }



  /**
   * TODO:
   * make Links/button reusable
   * make Fields reusable
   * add information icon and modal to each features
   */
  return (
    <div className="flex flex-col mt-4">
      <div className="trees--controllers ml-4">
        <div className="b-field-container">
          <span className="b-field-label">Operations:</span>
          
          <div className="b-field-content">
            <input type="text"
              className="BInput w-16"
              placeholder="node#"
              value={operationVal}
              onChange={e => setOperationVal(e.target.value)}
            />
            <a className="b-button"
              onClick={insertNode}
            >
              Insert
            </a>
            <span className="b-separate">|</span>
            <a className="b-button"
              onClick={searchNode}
            >
              Search
            </a>
            <span className="b-separate">|</span>
            <a className="b-button"
              onClick={deleteNode}
            >
              Delete
            </a>
          </div>
        </div>

        <div className="b-field-container">
          <span className="text-gray-400 text-xs mr-2">Find:</span>

          <div className="inline-block border border-zinc-800 mr-2">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => animateHighlight([bst.min()])}
            >
              Min
            </a>
            <span className="text-zinc-800">|</span>
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => animateHighlight([bst.max()])}
            >
              Max
            </a>
          </div>

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
            <span className="text-zinc-800">|</span>
            <a className="cursor-pointer m-2"
              onClick={findPredecessor}
            >
              Predecessor
            </a>
          </div>
        </div>
        
        <div className="b-field-container">
          <span className="text-gray-400 text-xs mr-2">Traversals:</span>
          <div className="inline-block border border-zinc-800">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={preOrderTraversal}
            >
              Preorder
            </a>
            <span className="text-zinc-800">|</span>
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={inOrderTraversal}
            >
              Inorder
            </a>
            <span className="text-zinc-800">|</span>
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={postOrderTraversal}
            >
              Postorder
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <BinaryVisualizer data={bst} highlightNodes={highlightNodes} />
      </div>
    </div>
  );
};