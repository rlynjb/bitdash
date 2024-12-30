
export default function QuickSort() {

  /**
   * @param {list_int32} arr
   * @return {list_int32}
   */
  function quick_sort(arr: number[]) {
    // Write your code here.
    return combine(arr, 0, arr.length-1);
  }

  function swapHelper(arr: number[], i1: number, i2: number) {
    let temp = arr[i2];
    arr[i2] = arr[i1];
    arr[i1] = temp;
  }

  function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function combine(arr: number[], start: number, end: number) {
    // base case
    if (start >= end) return arr;
    
    // combine
    let pivotIndex = getRandomInt(start, end);
    swapHelper(arr, start, pivotIndex);
    
    let small = start;
    for (let big = start+1; big <= end; big++) {
        if (arr[big] < arr[start]) {
            small++;
            swapHelper(arr, big, small);
        }
    }
    swapHelper(arr, small, start);
    
    // divide using recursive
    combine(arr, start, small - 1);
    combine(arr, small + 1, end);
    
    return arr;
  }


  return (
    <div>
      Quick Sort
    </div>
  );
}
