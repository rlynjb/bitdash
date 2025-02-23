/**
 * @param {list_int32} arr
 * @return {list_int32}
 */
export const bubble_sort = (arr: number[]) => {
  // Write your code here.
  for (let i=0; i<arr.length; i++) {
      for (let r=arr.length-1; r>i; r--) {
          if (arr[r] < arr[r-1]) {
              const highval = arr[r-1];
              arr[r-1] = arr[r];
              arr[r] = highval;
          }
      }
  }
  
  return arr;
}

export default bubble_sort;