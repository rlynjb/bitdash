/**
 * ref: https://interviewkickstart.com/blogs/learn/heap-sort
 */


/**
 * @name Iterative solution
 * 
 * @param {list_int32} arr
 * @return {list_int32}
*/

/*
Asymptotic complexity in terms of size of `arr` `n`:
* Time: O(n * log(n)).
* Auxiliary space: O(1).
* Total space: O(n).
*/

// This function will iteratively convert arr[rootIndex ... n - 1] into a Max-Heap.
function iterative_heapify(arr: any, rootIndex: any, n: any) {
  let currentRootIndex = rootIndex;

  while (true) {
      let i = currentRootIndex;
      let leftChildIndex = 2 * i + 1;
      let rightChildIndex = 2 * i + 2;

      // Finding the index of the largest value among:
      // arr[currentRootIndex], arr[leftChildIndex] and arr[rightChildIndex].
      if (leftChildIndex < n && arr[leftChildIndex] > arr[i]) {
          i = leftChildIndex;
      }
      if (rightChildIndex < n && arr[rightChildIndex] > arr[i]) {
          i = rightChildIndex;
      }

      // The largest among the three considered values will now be the root of the Max-Heap
      // represented by arr[currentRootIndex ... n - 1].
      if (i !== currentRootIndex) {
          [arr[i], arr[currentRootIndex]] = [arr[currentRootIndex], arr[i]]; // Swap values
          currentRootIndex = i;
      } else {
          break;
      }
  }
}

export function iterative_heap_sort(arr: any) {
  const n = arr.length;

  // Building a Max-Heap in a bottom-up manner.
  // Heapifying only the indices in range [0, n/2 - 1) because only these indices will have at least one
  // child node in the Max-Heap.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    iterative_heapify(arr, i, n);
  }

  for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap values
      iterative_heapify(arr, 0, i);
  }

  return arr;
}




/**
 * Recursive solution
 * 
 * @param {list_int32} arr
 * @return {list_int32}
*/

/*
Asymptotic complexity in terms of size of `arr` `n`:
* Time: O(n * log(n)).
* Auxiliary space: O(log(n)).
* Total space: O(n).
*/

// This function will recursively convert arr[rootIndex ... n - 1] into a Max-Heap.
function recursive_heapify(arr: any, rootIndex: any, n: any) {
  let largest = rootIndex;
  let leftChildIndex = 2 * rootIndex + 1;
  let rightChildIndex = 2 * rootIndex + 2;

  // Finding the index of the largest value among:
  // arr[rootIndex], arr[leftChildIndex] and arr[rightChildIndex]
  if (leftChildIndex < n && arr[leftChildIndex] > arr[largest]) {
      largest = leftChildIndex;
  }

  if (rightChildIndex < n && arr[rightChildIndex] > arr[largest]) {
      largest = rightChildIndex;
  }

  // The largest among the three considered values will now be the root of the Max-Heap
  // represented by arr[rootIndex ... n - 1].
  if (largest !== rootIndex) {
      [arr[largest], arr[rootIndex]] = [arr[rootIndex], arr[largest]]; // Swap values
      recursive_heapify(arr, largest, n);
  }
}

function recursive_heap_sort(arr: any) {
  const n = arr.length;

  // Building a Max-Heap in a bottom-up manner.
  // Heapifying only the indices in range [0, n/2 - 1) because only these indices will have at least one
  // child node in the Max-Heap.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    recursive_heapify(arr, i, n);
  }

  for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap values
      recursive_heapify(arr, 0, i);
  }

  return arr;
}


