"use client";

import React, { useState, useEffect } from "react";
import { selection_sort } from "@/utils/Algorithms/Sorting/";
import { generateArrayOfRandomNumbers } from "@/utils";

export default function SelectionSort() {
  const [data, setData] = useState([] as number[]);

  useEffect(() => {
    setData(generateArrayOfRandomNumbers(70));
  }, []);


  // Animate data
  const [bars, setBars] = useState([] as number[]);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // animate data as unsorted
    data.forEach((item, index) => {   
      setTimeout(() => {
        setBars(prevItem => [...prevItem, item]);

        if (index === data.length - 1) {
          countdown();
        }
      }, (index + 1) * 50);
    });

    // timer till sort transition.. display message "sorting in 3..2..1.."
    const countdown = () => {
      const msg = ["sorting in...", "3", "2", "1", ""];

      msg.forEach((item, index) => {
        setTimeout(() => {
          setCountdown(item);

          if (index === msg.length - 1) {
            sortBars();
          }
        }, (index + 1) * 1000);
      });
    }

    // animate data as sorted
    const sortBars = () => {
      const sortedData = selection_sort(data)

      // replace each value in bars with sorted ones
      // scan through sortedData
      sortedData.forEach((sortedBar, sortedBarIndex) => {
        // set delay
        setTimeout(() => {
          // and render new sortedBar by using sortedBarIndex to
          // target index in bars
          setBars(prevBars => {
            prevBars[sortedBarIndex] = sortedData[sortedBarIndex]
            return [...prevBars]
          });
        }, (sortedBarIndex + 1) * 100);
      });
    };
  }, [data]);


  return (
    <div className="absolute bottom-8" style={{ width: "-webkit-fill-available" }}>
      <h6 className="text-center">
        {countdown}
      </h6>

      <div className="flex items-end justify-center">
        {bars.map((num, index) => {
          return <div key={index} className="text-center">
            <div
              className={`mx-0.5 bg-white`}
              style={{height: `${num}vh`, width: "0.5vw"}}
            >
            </div>
          </div>
        })}
      </div>
    </div>
  );
}
