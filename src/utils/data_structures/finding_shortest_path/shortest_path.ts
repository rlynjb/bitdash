function Dijkstras(g: any, start_index: any) {
  const cost = new Array(g.num_nodes).fill(Infinity);
  const last = new Array(g.num_nodes).fill(-1);
  const pq = new PriorityQueue(true);
  
  pq.enqueue(start_index, 0.0);
  for (let i = 0; i < g.num_nodes; i++) {
    if (i !== start_index) {
      pq.enqueue(i, Infinity);
    }
  }
  cost[start_index] = 0.0;
  
  while (!pq.isEmpty()) {
    const index = pq.dequeue();
    
    for (const edge of g.nodes[index].getEdgeList()) {
      const neighbor = edge.to_node;
      
      if (pq.inQueue(neighbor)) {
        const new_cost = cost[index] + edge.weight;
        
        if (new_cost < cost[neighbor]) {
          pq.updatePriority(neighbor, new_cost);
          last[neighbor] = index;
          cost[neighbor] = new_cost;
        }
      }
    }
  }

  return last;
}