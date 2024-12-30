import React from "react";

export default function SelectionSort() {
  /**
   * NOTE:
   * we want random numbers by default.
   * be able to input dynamic size (length of array).
   */


  /**
   * @param length 
   * @returns {Int32Array}
   */
  const generateRandomNumbers = (length: number) => {
    let list = [];

    for (let i = 0; i < length; i++) {
      list.push(Math.floor(Math.random() * 100));
    }
    return list;
  }
  
  const data = generateRandomNumbers(10);


  /**
   * @param {list_int32} arr
   * @return {list_int32}
   */
  function selection_sort(arr: number[]) {
    for(let t=0; t<arr.length; t++) {
        let minVal = arr[t];
        let minIndex = t;
        
        for(let a = t+1; a <arr.length; a++){
            if(arr[a] < minVal){
                minVal = arr[a]
                minIndex = a;
            }
            
        }
        [arr[t], arr[minIndex]] = [arr[minIndex], arr[t]];
    }
    return arr;
  }


  return (
    <div>
      <h6 className="mb-6">
        Selection Sort
      </h6>

      <div className="flex items-end h-fit">
        {data.map((num, index) => {
          return <div key={index} className="text-center">
            <div
              className={`mx-1 bg-white w-3.5`}
              style={{height: `${num}px`}}
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
