Heap {
  Array: array
  Integer: array_size
  Integer: last_index
}

HeapInsert(Heap: heap, Type: value):
  IF heap.last_index == heap.array_size - 1:
    Increase Heap size.

  heap.last_index = heap.last_index + 1
  heap.array[heap.last_index] = value

  # Swap the new node up the heap.
  Integer: current = heap.last_index
  Integer: parent = Floor(current / 2)
  WHILE parent >= 1 AND (heap.array[parent] < heap.array[current]):
    Type: temp = heap.array[parent]
    heap.array[parent] = heap.array[current]
    heap.array[current] = temp
    current = parent
    parent = Floor(current / 2)
