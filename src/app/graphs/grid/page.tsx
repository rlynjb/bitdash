
import { Graph2 } from "@/utils/data_structures";

export default function Grid() {
  const graph = new Graph2(5);

  graph.insertEdge(0, 1, 1.0)
  graph.insertEdge(0, 3, 1.0)
  graph.insertEdge(0, 4, 3.0)
  graph.insertEdge(1, 2, 2.0)
  graph.insertEdge(1, 4, 1.0)
  graph.insertEdge(3, 4, 1.0)
  graph.insertEdge(4, 2, 3.0)
  graph.insertEdge(4, 3, 3.0)

  //console.log('makeEdgeList', graph.makeEdgeList())
  //console.log('g1', graph)

  /**
   * @name makeGridGraph()
   * 
   * @param width 
   * @param height 
   * @returns 
   */
  const makeGridGraph = (width: number, height: number) => {
    const numNodes = width * height;

    const g = new Graph2(numNodes, true);

    for (let r=0; r<height; r++) {
      for (let c=0; c<width; c++) {
        const index = r * width + c;

        if (c < width - 1) {
          g.insertEdge(index, index + 1, 1.0);
        }
        if (r < height - 1) {
          g.insertEdge(index, index + width, 1.0)
        }
      }
    }

    return g;
  }

  const gmap = makeGridGraph(12, 12).nodes;

  /**
   * @name computeNextRow()
   * 
   * @param {number} totalNodes
   * @param {number} columnsPerRow
   * @return {array_number} list of cell index that should be in next row/line
   */
  const computeNextRow = (totalNodes: number, columnsPerRow: number): number[] => {
    let counter = 1;
    let row = columnsPerRow;
    let result = [] as any;

    result.push(columnsPerRow)

    for (let i=0; i<totalNodes; i++) {
      if (i === row) {
        counter++;
        row = columnsPerRow * counter;
        result.push(row)
      }
    }

    return result;
  }


  return (
    <div className="flex justify-center mt-4 px-[1em]">
      <div className="grid-diagram w-fit">
      {gmap.map((cell: any, cellIndex: any) => {
        return (
          <div
            key={cellIndex}
            className={`node border border-zinc-700 w-[40px] h-[40px] bg-zinc-900 float-left ${computeNextRow(gmap.length, 12).includes(cellIndex) ? 'clear-left' : ''}`}
          >
          </div>          
        )
      })}
      </div>
    </div>
  )
}
