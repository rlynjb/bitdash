import { Graph2, breadth_first_search } from "../Graph2";

class PGState {
  guards_left: number;
  prisoners_left: number;
  boat_side: string;

  constructor(guards_left: number = 3, prisoners_left: number = 3, boat_side: string = "L") {
    this.guards_left = guards_left;
    this.prisoners_left = prisoners_left;
    this.boat_side = boat_side;
  }

  toString() {
    return `${this.guards_left},${this.prisoners_left},${this.boat_side}`;
  }
}

/**
 * TODO:
 * STUDY result_of_move
 * this can be used in front-end
 */
function pg_result_of_move(state: PGState, num_guards: number, num_prisoners: number) {
  if (num_guards < 0 || num_prisoners < 0) return null;
  if (num_guards + num_prisoners === 0) return null;
  if (num_guards + num_prisoners > 2) return null;

  /**
   * note:
   * computes the resulting number of prisoners and guards on both
   * left and right shores.
   */
  let G_L = state.guards_left;
  let G_R = 3 - state.guards_left;
  let P_L = state.prisoners_left;
  let P_R = 3 - state.prisoners_left;

  let new_side;
  if (state.boat_side === "L") {
    // num_guards: 1, 2, 0, 0, 1
    G_L -= num_guards;
    G_R += num_guards;
    // num_prisoners: 0, 0, 1, 2, 1
    P_L -= num_prisoners;
    P_R += num_prisoners;
    new_side = "R";
  } else {
    // num_guards: 1, 2, 0, 0, 1
    G_L += num_guards;
    G_R -= num_guards;
    // num_prisoners: 0, 0, 1, 2, 1
    P_L += num_prisoners;
    P_R -= num_prisoners;
    new_side = "L";
  }

  /**
   * 4 counts above are used to check whether the new state is valid.
   * checks that the move is not relating more people than are on the current
   * shower by confirming that none of the counts become negative.
   */
  if (G_L < 0 || P_L < 0 || G_R < 0 || P_R < 0) return null;

  /**
   * it also checks that the new state has a valid Balance of guards and prisoners.
   */
  if (G_L > 0 && G_L < P_L) return null;
  if (G_R > 0 && G_R < P_R) return null;

  return new PGState(G_L, P_L, new_side);
}

function pg_neighbors(state: PGState) {
  let neighbors = [];
  const moves = [[1, 0], [2, 0], [0, 1], [0, 2], [1, 1]];

  for (const move of moves) {
    const n = pg_result_of_move(state, move[0], move[1]);
    if (n !== null) {
      neighbors.push(n);
    }
  }
  return neighbors;
}

export function create_prisoners_and_guards() {
  /**
   * Note:
   * mimicking bfs
   */
  const visited = {} as any; // dictionary
  const queue = []; // queue
  const g = new Graph2(0, true);
  
  const initial_state = new PGState(3, 3, "L");
  const initial = g.insertNode(initial_state);

  queue.push(initial.index);
  visited[initial_state.toString()] = initial.index;
  
  while (queue.length > 0) {
    const current_ind = queue.shift();
    const current_node = g.nodes[current_ind];
    const current_state = current_node.label;
    
    /**
     * Note:
     * unlike prev bfs, we cannot rely on graph node's edgelist.
     * instead, we will use pg_neighbors() to check
     * got possible neighboring states
     */
    const neighbors = pg_neighbors(current_state);
    for (const state of neighbors) {
      const state_str = state.toString();
      /**
       * if we havent seen state yet, create a node in graph
       * and mark as seen
       */
      if (!(state_str in visited)) {
        const new_node = g.insertNode(state);

        visited[state_str] = new_node.index;
        queue.push(new_node.index);
      }

      /**
       * and create new edge between current node
       * and its neighbors
       */
      const new_ind = visited[state.toString()];
      g.insertEdge(current_ind, new_ind, 1.0);
    }
  }
  
  /**
   * return a graph that includes only states that are reachable
   * from initial state by valid moves.
   */
  return g;
}

/**
 * helper function for Puzzle Search
 * allows us to look up the start and goal indices without
 * tracing through the graph
 */
function pg_state_to_index_map(g: any) {
  const state_to_index = {} as any;

  for (const node of g.nodes) {
    state_to_index[node.label.toString()] = node.index;
  }
  return state_to_index;
}

export function solve_pg_bfs(check_end_index: string = "0,0,R") {
  const g = create_prisoners_and_guards();

  console.log(g)
  
  const state_to_index = pg_state_to_index_map(g);

  const state_index = state_to_index["3,3,L"];
  const end_index = state_to_index[check_end_index]; // prev "0,0,R"
  const last = breadth_first_search(g, state_index) as any;

  let current = end_index;
  const path_reversed = [];

  // reverses parent list from graph
  while (current !== -1) {
    path_reversed.push(current);
    current = last[current];
  }
  
  // checks if its a valid move
  if (path_reversed[path_reversed.length - 1] !== state_index) {
    console.log("No solution");
    return;
  }
  
  let res = '';

  for (let i = 0; i < path_reversed.length; i++) {
    const n = path_reversed[path_reversed.length - 1 - i];
    console.log(`Step ${i}: ${g.nodes[n].label}`);
    res = g.nodes[n].label;
  }

  return res;
}

