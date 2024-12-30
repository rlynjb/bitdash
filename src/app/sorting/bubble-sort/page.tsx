
export default function BubbleSort() {

  /**
   * @param {list_int32} arr
   * @return {list_int32}
   */
  function bubble_sort(arr: number[]) {
    // Write your code here.
    for (let i=0; i<arr.length; i++) {
        for (let r=arr.length-1; r>i; r--) {
            if (arr[r] < arr[r-1]) {
                let highval = arr[r-1];
                arr[r-1] = arr[r];
                arr[r] = highval;
            }
        }
    }
    
    return arr;
  }


  return (
    <div>
      Bubble Sort
    </div>
  );
}
