/**
 * ref: https://interviewkickstart.com/blogs/learn/heap-sort
 * https://www.educative.io/blog/data-structure-heaps-guide
 * https://gallery.selfboot.cn/en/algorithms/heap
 */

const getParentIndex = (child: any) => {
  return Math.floor((child - 1) / 2);
}

const getLeftChildIndex = (parent: any) => {
  return (2 * parent) + 1;
}

const getRightChildIndex = (parent: any) => {
  return (2 * parent) + 2;
}

/**
 * @name swap()
 * 
 * @param {int} index1 
 * @param {int} index2
 * @update {array_int} heap array
 */
const swap = (index1: number, index2: number, arr: any[]) => {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  // or
  // this.heap[index1][index2] = this.heap[index2][index1]
}

export class MinHeap {
  heap: any[];
  prevHeap: any[];
  swapSequence: number[][];

  constructor(initData: any = []) {
    this.heap = initData;
    this.prevHeap = [];
    this.swapSequence = [];
  }

  /**
   * @name heapifyUp()
   * 
   * called after inserting value to heap
   * and bubbles up small values
   * 
   * @note
   * (child > 0)
   * - makes sure there are items in heap array
   * 
   * (this.heap[child] < this.heap[parent])
   * - checks if current node/child is less than parent
   * - swaps value in-place resulting in MinHeap
   */
  heapifyUp() {
    let child = this.heap.length - 1;
    let parent = getParentIndex(child);

    while (child > 0 && (this.heap[child] < this.heap[parent])) {
      swap(parent, child, this.heap);
      this.swapSequence.push([parent, child])

      child = parent;
      parent = getParentIndex(child);
    }
  }

  /**
   * @name insert()
   * 
   * @param value 
   */
  insert(value: number) {
    this.heap.push(value);
    this.prevHeap.push(value)
    this.heapifyUp();
  }

  /**
   * @name heapifyDown()
   * 
   * called after extracting Min Heap (getMin())
   * - swaps first index value with last index value
   * - remove last element in heap array
   * - and return last element
   * - run heapifyDown to satisfy Heap property
   * -- bubbles down large values
   */
  heapifyDown() {
    let parent = 0;
    let leftChild = getLeftChildIndex(parent);
    let childExists = (child: any) => child < this.heap.length;

    while (childExists(leftChild)) {
      let smallerChild = leftChild;
      const rightChild = getRightChildIndex(parent);

      if (childExists(rightChild) && this.heap[rightChild] < this.heap[leftChild]) {
        smallerChild = rightChild;
      }

      if (this.heap[parent] > this.heap[smallerChild]) {
        swap(parent, smallerChild, this.heap);
        this.swapSequence.push([parent, smallerChild])

        parent = smallerChild;
        leftChild = getLeftChildIndex(parent);
      }
    }
  }

  /**
   * @name getMin()
   * same as delete() operation
   * 
   * @return {number} removedNode
   * 
   * TODO:
   * look into why after alot of ExtractMin,
   * getMin() lags and crashes browser
   */
  getMin(): number | undefined {
    if (this.heap.length === 0) return undefined;

    swap(0, this.heap.length - 1, this.heap);
    
    const removedNode = this.heap.pop(); // removes last element

    this.prevHeap = this.prevHeap.filter(item => item !== removedNode);

    this.heapifyDown();

    return removedNode;
  }
}


export class MaxHeap {
  heap: any[];
  prevHeap: any[];
  swapSequence: number[][];

  constructor(initData: any = []) {
    this.heap = initData;
    this.prevHeap = [];
    this.swapSequence = [];
  }

  /**
   * @name heapifyUp()
   * 
   * called after inserting value to heap
   * and bubbles up small values
   * 
   * @note
   * (child > 0)
   * - makes sure there are items in heap array
   * 
   * (this.heap[child] < this.heap[parent])
   * - checks if current node/child is less than parent
   * - swaps value in-place resulting in MinHeap
   */
  heapifyUp() {
    let child = this.heap.length - 1;
    let parent = getParentIndex(child);

    while (child > 0 && (this.heap[child] > this.heap[parent])) {
      swap(parent, child, this.heap);
      this.swapSequence.push([parent, child])

      child = parent;
      parent = getParentIndex(child);
    }
  }

  /**
   * @name insert()
   * 
   * @param value 
   */
  insert(value: number) {
    this.heap.push(value);
    this.prevHeap.push(value)
    this.heapifyUp();
  }

  /**
   * @name heapifyDown()
   * 
   * called after extracting Max Heap (getMax())
   * - swaps first index value with last index value
   * - remove last element in heap array
   * - and return last element
   * - run heapifyDown to satisfy Heap property
   * -- bubbles down large values
   */
  heapifyDown() {
    let parent = 0;
    let leftChild = getLeftChildIndex(parent);
    let childExists = (child: any) => child < this.heap.length;
    
    while (childExists(leftChild)) {
      let smallerChild = leftChild;
      const rightChild = getRightChildIndex(parent);

      if (childExists(rightChild) && this.heap[rightChild] > this.heap[leftChild]) {
        smallerChild = rightChild;
      }

      if (this.heap[parent] < this.heap[smallerChild]) {
        swap(parent, smallerChild, this.heap);
        this.swapSequence.push([parent, smallerChild])

        parent = smallerChild;
        leftChild = getLeftChildIndex(parent);
      }
    }
  }

  /**
   * @name getMax()
   * same as delete() operation
   * 
   * @return {number} removedNode
   * 
   * TODO:
   * look into why after alot of ExtractMax,
   * getMax() lags and crashes browser
   */
  getMax(): number | undefined {
    if (this.heap.length === 0) return undefined;

    swap(0, this.heap.length - 1, this.heap);
    
    const removedNode = this.heap.pop(); // removes last element

    this.prevHeap = this.prevHeap.filter(item => item !== removedNode);
    
    this.heapifyDown();

    return removedNode;
  }
}


/**
 * @name heap_sort()
 * 
 * @param {list_int32} arr
 * @return {list_int32}
 */
function heap_sort(arr: any) {
  const minHeap = new MinHeap();
  const output = [];

  /**
   * NOTE:
   * build min/max heap
   * add all values of arr to heap
   */
  arr.forEach((num: any) => minHeap.insert(num));

  /**
   * NOTE:
   * Solution 1:
   * - pop min/max heap value and push to output array.
   * - resulting a sorted array in asc/dsc order.
   * 
   * Solution 2:
   * - after min/max heapifying input array
   * - re-heapify the unsorted section. This is similar to selection sort.
   * 
   * ref: https://reginafurness.medium.com/implementing-heap-sort-in-javascript-e52683b54935
   */
  for (let i = 0; i < arr.length; i++) {
    output.push(minHeap.getMin());
  }
  return output;
}


/**
 * ref: https://www.geeksforgeeks.org/construct-complete-binary-tree-given-array/
 */
class Node {
  key: any;
  left: any;
  right: any;

  constructor(key: any) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
export class CompleteBinaryTree {
  root: any;

  constructor(heapArr?: any, index?: any) {
    if (heapArr.length === 0 && !index) {
      this.root = null;
    } else {
      this.root = this.buildLevelOrder(heapArr, index);
    }
  }

  buildLevelOrder(arrLevelOrder: any, indexLevelOrder: any) {
    const levelOrderRecursive = (arr: any, i: any) => {
      let rootRes = null;

      // Base case for recursion
      if (i < arr.length) {
        rootRes = new Node(arr[i]);
        rootRes.left = levelOrderRecursive(arr, 2 * i + 1);
        rootRes.right = levelOrderRecursive(arr, 2 * i + 2);
      }
      return rootRes;
    }

    return levelOrderRecursive(arrLevelOrder, indexLevelOrder);
  }


  /**
   * NOTE:
   * find no use of it for now.
   * levelOrder works fine with building a complete binary tree for display
   */
  /*
  inOrder(root: any) {
    const inOrderRecursive = (rooy: any) => {
      if (root != null) {
        inOrderRecursive(root.left);
        //document.write(root.data + " ");
        inOrderRecursive(root.right);
      }
    }
  }
  */
}

// -------------------------------------------


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

/**
 * NOTE:
 * Heap Sort contains 2 phases
 * 1. Building a max/min heap from all the items.
 * 2. Extracting all the items from the heap in decreasing
 *    sorted order and storing them in an array.
 */
export function iterative_heap_sort(arr: any) {
  const n = arr.length;

  // Building a Max-Heap in a bottom-up manner.
  // Heapifying only the indices in range [0, n/2 - 1) because only these indices will have at least one
  // child node in the Max-Heap.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    iterative_heapify(arr, i, n);
  }

  /**
   * NOTE:
   * re-heapifying the unsorted section. It is similar to selection sort
   */
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


