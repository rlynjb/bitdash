"use client";

import "./styles.css";
import { useEffect, useState } from "react";
import { BinaryVisualizer } from "@/components";
import { BinarySearchTree } from "@/utils/data_structures";

export default function BinarySearchTreePage() {
  const binaryTree = new BinarySearchTree();
  const [ BSTState, setBSTState ] = useState(binaryTree as any);
  const [ insertValue, setInsertValue ] = useState("" as any);

  const defaultValues = [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]

  const [ BSTNodes, setBSTNodes ] = useState([...defaultValues] as number[]);

  const updateBST = () => {
    BSTNodes.forEach((val: any) => {
      binaryTree.insert(val);
    });
  }

  updateBST();


  const insert = () => {
    if (insertValue === "") return;
    
    const newVal = parseInt(insertValue);

    setBSTNodes((prev) => {
      return [...prev, newVal]
    })

    setInsertValue("");
  }

  useEffect(() => {
    setBSTState(binaryTree);
  }, [BSTNodes]);


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
        {/**
        <div className="mr-4">
          <input type="text" className="BInput bg-neutral-800 py-1 px-2 w-16" placeholder="node#" />
          <a className="cursor-pointer m-2"
            onClick={search}
          >
            Search
          </a>
        </div>
        <div>
          <input type="text" className="BInput bg-neutral-800 py-1 px-2 w-16" placeholder="node#" />
          <a className="cursor-pointer m-2"
            onClick={remove}
          >
            Remove
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
        <BinaryVisualizer data={BSTState} />
      </div>
    </div>
  );
};