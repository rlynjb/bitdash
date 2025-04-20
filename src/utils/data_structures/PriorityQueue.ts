class HeapItem {
  value: any;
  priority: any;

  constructor(value: any, priority: any) {
    this.value = value;
    this.priority = priority;
  }

  lt(other: any) {
    return this.priority < other.priority;
  }

  gt(other: any) {
    return this.priority > other.priority;
  }
}

export class PriorityQueue {
  arraySize: any;
  heapArray: any;
  lastIndex: any;
  isMinHeap: any;
  indices: any;

  constructor(size = 100, minHeap = false) {
    this.arraySize = size;
    this.heapArray = new Array(size).fill(null);
    this.lastIndex = 0;
    this.isMinHeap = minHeap;
    this.indices = {};
  }

  size() {
    return this.lastIndex;
  }

  isEmpty() {
    return this.lastIndex === 0;
  }

  inQueue(value: any) {
    return value in this.indices;
  }

  getPriority(value: any) {
    if (!(value in this.indices)) {
      return null;
    }
    const ind = this.indices[value];
    return this.heapArray[ind].priority;
  }

  _elementsInverted(parent: any, child: any) {
    if (parent < 1 || parent > this.lastIndex) {
      return false;
    }
    if (child < 1 || child > this.lastIndex) {
      return false;
    }

    if (this.isMinHeap) {
      return this.heapArray[parent].gt(this.heapArray[child]);
    } else {
      return this.heapArray[parent].lt(this.heapArray[child]);
    }
  }

  _swapElements(index1: any, index2: any) {
    if (index1 < 1 || index1 > this.lastIndex) {
      return;
    }
    if (index2 < 1 || index2 > this.lastIndex) {
      return;
    }

    const item1 = this.heapArray[index1];
    const item2 = this.heapArray[index2];
    this.heapArray[index1] = item2;
    this.heapArray[index2] = item1;

    this.indices[item1.value] = index2;
    this.indices[item2.value] = index1;
  }

  _propagateUp(index: any) {
    let parent = Math.floor(index / 2);
    while (this._elementsInverted(parent, index)) {
      this._swapElements(parent, index);
      index = parent;
      parent = Math.floor(index / 2);
    }
  }

  _propagateDown(index: any) {
    while (index <= this.lastIndex) {
      let swap = index;
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
    if (value in this.indices) {
      this.updatePriority(value, priority);
      return;
    }

    if (this.lastIndex === this.arraySize - 1) {
      const oldArray = this.heapArray;
      this.heapArray = new Array(this.arraySize * 2).fill(null);
      for (let i = 0; i <= this.lastIndex; i++) {
        this.heapArray[i] = oldArray[i];
      }
      this.arraySize *= 2;
    }

    this.lastIndex++;
    this.heapArray[this.lastIndex] = new HeapItem(value, priority);
    this.indices[value] = this.lastIndex;
    this._propagateUp(this.lastIndex);
  }

  dequeue() {
    if (this.lastIndex === 0) {
      return null;
    }

    const result = this.heapArray[1];
    const newTop = this.heapArray[this.lastIndex];
    this.heapArray[1] = newTop;
    this.indices[newTop.value] = 1;

    this.heapArray[this.lastIndex] = null;
    delete this.indices[result.value];
    this.lastIndex--;

    this._propagateDown(1);
    return result.value;
  }

  updatePriority(value: any, priority: any) {
    if (!this.indices.hasOwnProperty(value)) {
      return;
    }

    const index = this.indices[value];
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