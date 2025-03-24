"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { BinaryVisualizer } from "@/components";
import { delayLoop } from "@/utils";
import { iterative_heap_sort } from "@/utils/data_structures";

export default function BinaryHeap() {
  const inputArr = [77, 15, 91, 21, 6, 46];
  const val = {
    root:
    {
      key: 9, left: null, right: null
    }
  }


  console.log('test', iterative_heap_sort(inputArr))


  return (
    <>
      Binary Heap<br/>*WIP

      <BinaryVisualizer data={val} />
    </>
  )
}