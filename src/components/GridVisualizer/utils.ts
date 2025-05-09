import { Graph2, PriorityQueue } from "@/utils/data_structures";

/**
 * @name isObstacle()
 * @desc checks if a node is an obstacle using its row/column
 * 
 * @param {number} row
 * @param {number} column
 * @param {array_objects} obstacles
 * @return {boolean}
 */
const isObstacle = (row: any, column: any, obstacles: any): boolean => {
  const itExist = obstacles.find((v: any) => v.row === row && v.column === column)
  return itExist ? true : false;
}

/**
 * @name makeGridGraph()
 * @desc
 * |_ core code that builds te grid diagram
 * |_ updates Graph class with:
 * |  |_ inserts a nodes' edges
 * |  |  |_ determines if a node should have edges or no (obstacle)
 * |  |_ use to keep track of obstacles 
 * |  |  |_ mark a node if its an obstacle
 * |  |_ used in templating, to grey out an obstacle
 * 
 * @param {object} graph class
 * @param {number} width 
 * @param {number} height 
 * @returns {object} graph class
 * @update passed graph class
 * 
 * @todo move this inside Graph2 possibly
 */
export const makeGridGraph = (width: number, height: number, obstacles?: any) => {
  // NOTE: only use if graph class is defined inside
  const numNodes = width * height;
  const g = new Graph2(numNodes, true);
  //const g = graph;

  for (let r=0; r<height; r++) {
    for (let c=0; c<width; c++) {
      const index = r * width + c;

      if (!isObstacle(r, c, obstacles)) {
        if (c < width - 1 && !isObstacle(r, c+1, obstacles)) {
          g.insertEdge(index, index + 1, 1.0);
        }
        if (r < height - 1 && !isObstacle(r+1, c, obstacles)) {
          g.insertEdge(index, index + width, 1.0)
        }
      }

      if (isObstacle(r, c, obstacles)) {
        g.markObstacle(index, true)
      }

      g.addNodeMatrice(index, r, c)
      
    }
  }
  return g;
}

//const graph = makeGridGraph(width, height, obstacles);
