"use client";

import React, { useState, useEffect } from "react";
import { selection_sort } from "@/utils/Algorithms/Sorting/";
import { generateArrayOfRandomNumbers } from "@/utils";
import { clearInterval } from "timers";

export default function SelectionSort() {
  const [data, setData] = useState([] as number[]);

  useEffect(() => {
    //const sortedData = selection_sort(generateArrayOfRandomNumbers(60))
    setData(generateArrayOfRandomNumbers(60));
  }, []);


  // Animate data
  const [bar, setBar] = useState([] as number[]);

  useEffect(() => {
    data.forEach((item, index) => {   
      setTimeout(() => {
        setBar(prevItem => [...prevItem, item]);
      }, (index + 1) * 100);
    });
  }, [data]);


  return (
    <div className="absolute bottom-8" style={{ width: "-webkit-fill-available" }}>
      <div className="flex items-end justify-center">
        {bar.map((num, index) => {
          return <div key={index} className="text-center">
            <div
              className={`mx-1 bg-white`}
              style={{height: `${num}vh`, width: "0.8vw"}}
            >
            </div>
            <p className="text-xs">
              {num}
            </p>
          </div>
        })}
      </div>
    </div>
  );
}
