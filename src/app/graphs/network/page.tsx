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
  const graph = new Graph(edgeList.length);
  const d3_data = {
    nodes: convertAdjListToD3Nodes(graph.adjList),
    links: convertEdgeListToD3Links(edgeList)
  }
  const [ edgeListTextarea, setEdgeListTextarea] = useState(edgeList.join("\n")) as any;

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
      <div className="absolute controllers ml-4 grid grid-cols-6">
        <div className="col-span-2">
          <span className="text-gray-400 text-xs mr-2">Edge List</span>
          <br/>
          <textarea
            className="BTextarea bg-neutral-800 w-16 p-2"
            rows={10}
            value={edgeListTextarea}
            onChange={edgeListInput}
          />
        </div>
        <div className="col-span-4">
          <span className="text-gray-400 text-xs mr-2">Converted to Adjacency List</span>
          <br />
          {renderAdjList(graph.adjList)}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <NetworkDiagram width={700} height={500} data={d3_data} />
      </div>
    </div>
  );
}