/**
 * @param {list_int32} arr
 * @return {list_int32} arr
 */
export const selection_sort = (arr: number[]) => {
  for (let t=0; t<arr.length; t++) {
    let minVal = arr[t];
    let minIndex = t;
    
    // scan from left to right to find lowest value
    for (let a = t+1; a <arr.length; a++) {
      if (arr[a] < minVal) {
        minVal = arr[a]
        minIndex = a;
      }  
    }

    [arr[t], arr[minIndex]] = [arr[minIndex], arr[t]];
  }
  return arr;
}

export default selection_sort;