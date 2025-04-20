import { Graph2, PriorityQueue } from "@/utils/data_structures";


function Dijkstras(g: any, start_index: any) {
  // a list of best costs so far for each node
  const cost = new Array(g.num_nodes).fill(Infinity);
  // a list indicating the last node visited before a given node
  // aka parent
  const parent = new Array(g.num_nodes).fill(-1);
  // a minheap of unvisited nodes
  const pq = new PriorityQueue(0, true);

  // adds all nodes in PQ,
  // but mark starting node priority to 0.0
  pq.enqueue(start_index, 0.0);
  for (let i = 0; i < g.num_nodes; i++) {
    if (i !== start_index) {
      pq.enqueue(i, Infinity);
    }
  }
  cost[start_index] = 0.0;

  // we then process the nodes stored in PQ one by one
  while (!pq.isEmpty()) {
    // while PQ isnt empty,
    // extract the min priority node...
    const currentMinNode = pq.dequeue();

    // ...and explore the node via its edges or neighbors
    for (const edge of g.nodes[currentMinNode].getEdgeList()) {
      const neighbor = edge.to_node;

      // we go through each neighbors and see if neighbor
      // is still in PQ
      // if it is, means the code hasn't visited it yet
      if (pq.inQueue(neighbor)) {
        // takes in current node and add it with its
        // neighbors' edge weight
        const currentNode_newCost = cost[currentMinNode] + edge.weight;

        // checks if current nodes' weight cost is lower than
        // its neighbors cost weight.
        // fyi, all infinite cost will be updated when they are first seen
        if (currentNode_newCost < cost[neighbor]) {
          // update the currentNode's neighbor with new lowest cost
          pq.updatePriority(neighbor, currentNode_newCost);

          parent[neighbor] = currentMinNode;
          cost[neighbor] = currentNode_newCost;
        }
      }
    }
  }

  return parent;
}