
export default function MergeSort() {
  /**
   * @param {list_int32} arr
   * @return {list_int32}
   */
  function merge_sort(arr: number[]) {
    // Write your code here.
    return divide_recursive_tree(arr, 0, arr.length - 1);
  }

  function divide_recursive_tree(A: number[], start: number, end: number): any {
    // base case
    if (start === end) return [A[start]];
    
    let midIndex = start + Math.floor((end - start) / 2);
    
    let left = divide_recursive_tree(A, start, midIndex);
    let right = divide_recursive_tree(A, midIndex + 1, end);
    
    return combine(left, right);
  }

  function combine(left: number[], right: number[]) {
    let i = 0, j = 0, merged_aux = [];
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            merged_aux.push(left[i]);
            i++;
        } else {
            merged_aux.push(right[j]);
            j++;
        }
    }
    
    while (i < left.length) {
        merged_aux.push(left[i]);
        i++;
    }
    while (j < right.length) {
        merged_aux.push(right[j]);
        j++
    }
    
    return merged_aux;
  }



  return (
    <div>
      Merge Sort
    </div>
  );
}
