/**
 * Modifiable Priority Queues
 * - use Max Heap to order items by their priority
 * - consists of a class wrapping a standard
 * heap-based priority queue and a dictionary
 * mapping items to their locations in the heap's array
 */

class HeapItem {
  /**
   * value - information stored as:
   */
  value: number | string | object;
  /**
   * item's priority floating-point number thats used to
   * determine which item is extracted next from the priority queue.
   */
  priority: number;

  constructor(value: number | string | object, priority: number) {
    this.value = value;
    this.priority = priority;
  }

  lt(other: any): boolean {
    return this.priority < other.priority;
  }

  gt(other: any): boolean {
    return this.priority > other.priority;
  }
}

export class PriorityQueue {
  heapArray: any;
  lastIndex: any;
  isMinHeap: any;
  valueIndicesLookup: any;

  constructor(size: number = 100, minHeap: boolean = false) {
    this.heapArray = new Array(size).fill(null);
    this.lastIndex = 0;
    this.isMinHeap = minHeap;
    this.valueIndicesLookup = {};
  }

  size() {
    return this.lastIndex;
  }

  isEmpty() {
    return this.lastIndex === 0;
  }

  inQueue(value: any): boolean {
    return this.valueIndicesLookup.hasOwnProperty(value);
  }

  getPriority(value: any) {
    if (!this.valueIndicesLookup.hasOwnProperty(value)) {
      return null;
    }
    const ind = this.valueIndicesLookup[value];
    return this.heapArray[ind].priority;
  }

  /**
   * NOTE:
   * internal helper functions.
   * these functions can be configurable as either
   * a min heap or a max heap.
   * 
   * 1st helper function
   */
  _elementsInverted(parent: any, child: any) {
    /**
     * this check accounts for the heap's use of an array
     * starting at index 1 by disallowing index 0.
     */
    if (parent < 1 || parent > this.lastIndex) {
      return false;
    }
    if (child < 1 || child > this.lastIndex) {
      return false;
    }

    if (this.isMinHeap) {
      // equivalent to, if parent > child = swap
      return this.heapArray[parent].gt(this.heapArray[child]);
    } else {
      // equivalent to, if parent < child = swap
      return this.heapArray[parent].lt(this.heapArray[child]);
    }
  }

  /**
   * 2nd helper function
   */
  _swapElements(index1: any, index2: any) {
    // checks for bounds
    if (index1 < 1 || index1 > this.lastIndex) return;
    if (index2 < 1 || index2 > this.lastIndex) return;

    const item1 = this.heapArray[index1];
    const item2 = this.heapArray[index2];

    // swap heap array
    this.heapArray[index1] = item2;
    this.heapArray[index2] = item1;

    // swap look up
    this.valueIndicesLookup[item1.value] = index2;
    this.valueIndicesLookup[item2.value] = index1;
  }

  /**
   * 3rd helper function
   */
  _propagateUp(lastIndex: any) {
    let parent = Math.floor(lastIndex / 2);
    while (this._elementsInverted(parent, lastIndex)) {
      this._swapElements(parent, lastIndex);

      // re-position parent and child indices
      // and check if heap property is valid
      lastIndex = parent;
      parent = Math.floor(lastIndex / 2);
    }
  }

  /**
   * 4th helper function
   */
  _propagateDown(index: any) {
    while (index <= this.lastIndex) {
      let swap = index;
      /**
       * check which child satisfies heap property.
       * and use that to swap element
       */
      if (this._elementsInverted(swap, 2 * index)) {
        swap = 2 * index;
      }
      if (this._elementsInverted(swap, 2 * index + 1)) {
        swap = 2 * index + 1;
      }

      if (index !== swap) {
        this._swapElements(index, swap);
        index = swap;
      } else {
        break;
      }
    }
  }

  enqueue(value: any, priority: any) {
    // does value already exist? if so...
    if (this.valueIndicesLookup.hasOwnProperty(value)) {
      this.updatePriority(value, priority);
      return;
    }

    /**
     * NOTE:
     * we use a standard array-based. each element in the array
     * corresponds to a node in the tree with the root node
     * at index 1.
     * we skip index 0, as is conventional for heaps.
     * 
     * thats why we increase lastIndex by 1
     * and heapArray index 0 is empty
     */
    this.lastIndex++;
    this.heapArray[this.lastIndex] = new HeapItem(value, priority);
    this.valueIndicesLookup[value] = this.lastIndex; // quick lookup

    this._propagateUp(this.lastIndex);
  }

  dequeue() {
    if (this.lastIndex === 0) return null;

    const firstItem = this.heapArray[1]; // takes the first element
    const lastItem = this.heapArray[this.lastIndex]; // takes the last element

    /**
     * SWAP ITEMS
     * Note:
     * thinking if its possible to use _swapElements helper function
     */
    // update heap array
    this.heapArray[1] = lastItem; // swaps last element with the first element
    this.heapArray[this.lastIndex] = null; // set last element in heap array

    // update lookup
    this.valueIndicesLookup[lastItem.value] = 1; // update lookup
    delete this.valueIndicesLookup[firstItem.value]; // remove object from lookup
    this.lastIndex--; // set lastIndex to the new last item

    // fixes any breakagesto the heap property
    this._propagateDown(1);

    return firstItem.value;
  }

  updatePriority(value: any, priority: any) {
    // check if value is NOT in priority queue
    if (!this.valueIndicesLookup.hasOwnProperty(value)) return;

    const index = this.valueIndicesLookup[value];
    const oldPriority = this.heapArray[index].priority;
    this.heapArray[index].priority = priority;

    if (this.isMinHeap) {
      if (oldPriority > priority) {
        this._propagateUp(index);
      } else {
        this._propagateDown(index);
      }
    } else {
      if (oldPriority > priority) {
        this._propagateDown(index);
      } else {
        this._propagateUp(index);
      }
    }
  }

  peakTop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.heapArray[1];
  }

  peekTopPriority() {
    const obj = this.peakTop();
    if (!obj) {
      return null;
    }
    return obj.priority;
  }

  peekTopValue() {
    const obj = this.peakTop();
    if (!obj) {
      return null;
    }
    return obj.value;
  }
}