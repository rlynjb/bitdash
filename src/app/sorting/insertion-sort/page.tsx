
export default function InsertionSort() {

  /**
   * @param {list_int32} arr
   * @return {list_int32}
   */
  function insertion_sort(arr: number[]) {
    // Write your code here.
    for (let i=0; i<arr.length; i++) {
        let temp = arr[i];
        let red = i-1;
        
        while(red >= 0 && arr[red] > temp) {
            arr[red+1] = arr[red];
            red--;
        }
        arr[red+1] = temp;
    }
    
    return arr;
  }

  return (
    <div>
      Insertion Sort
    </div>
  );
}
