/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./styles.css";
import { useEffect, useState } from "react";
import { Graph } from "@/utils/data_structures";
import {
  NetworkDiagram,
  convertEdgeListToD3Links,
  convertAdjListToD3Nodes,
  renderAdjList,
  renderAdjMatrix
} from "@/components";


export default function Network() {
  const sampledata = [
    [0, 1],
    [1, 4],
    [1, 2],
    [1, 3],
    [3, 5],
    [5, 0],
    [2, 5]
  ];
  const [edgeList, setEdgeList] = useState(sampledata as any);
  const graph = new Graph(edgeList.length, edgeList);
  const d3_data = {
    nodes: convertAdjListToD3Nodes(graph.adjList),
    links: convertEdgeListToD3Links(edgeList)
  }
  const [ edgeListTextarea, setEdgeListTextarea] = useState(edgeList.join("\n")) as any;
  const [ traversal, setTraversal ] = useState([] as any);

  /**
   * create adjList using Graph DS
   */
  for (let i=0; i < edgeList.length; i++) {
    graph.addEdge(edgeList[i][0], edgeList[i][1])
  }

  useEffect(() => {
    /**
     * TODO:
     * - look into highlighting/animating vertex and links
     */
    console.log('BFS: ', graph.bfs_traversal(edgeList.length, edgeList))
    console.log('DFS: ', graph.dfs_traversal(edgeList.length, edgeList))
  }, []);


  const edgeListInput = (event?: any) => {
    const val = event.target.value;
    setEdgeListTextarea(val);

    // update edgeList
    const newVal = val
      .split("\n")
      .map((edge: any) => edge.split(","))

    // nested array = should have 2 items
    // nested array = should not have empty string
    const isNestedArrayHave1Item = newVal.map((edge: any) => edge.length).includes(1);
    const isNestedArrayHaveEmptyString = newVal.map((edge: any) => edge.includes("")).includes(true);

    if (isNestedArrayHaveEmptyString) return;
    if (isNestedArrayHave1Item) return;

    setEdgeList([...newVal]);
  }


  return (
    <div className="flex flex-col mt-4">
      <div className="absolute controllers ml-4 grid grid-cols-10">
        <div className="col-span-2">
          <span className="text-gray-400 text-xs mr-2">Edge List</span>
          <br/>
          <textarea
            className="BTextarea bg-neutral-800 w-16 p-2"
            rows={10}
            value={edgeListTextarea}
            onChange={edgeListInput}
          />
          <br/>
          <span className="text-gray-400 text-xs mr-2">Traversals:</span>
          <br/>
          <div className="inline-block border border-zinc-800 mr-2">
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => setTraversal(graph.bfs_traversal(edgeList.length, edgeList))}
            >
              BFS
            </a>
            <span className="text-zinc-800">|</span>
            <a className="inline-block cursor-pointer py-1 px-2"
              onClick={() => setTraversal(graph.dfs_traversal(edgeList.length, edgeList))}
            >
              DFS
            </a>
          </div>
        </div>
        <div className="col-span-4">
          <span className="text-gray-400 text-xs mr-2">Print Adjacency List</span>
          <br />
          {renderAdjList(graph.adjList)}
        </div>
        <div className="col-span-4">
          <span className="text-gray-400 text-xs mr-2">Print Adjacency Matrix</span>
          <br />
          {renderAdjMatrix(graph.displayAdjacencyMatrix(edgeList.length, edgeList))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <NetworkDiagram
          width={800}
          height={600}
          data={d3_data}
          highlightNodes={traversal}
        />
      </div>
    </div>
  );
}