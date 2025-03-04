/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/**
 * TODO: move this page to a plain Javascript and html
 * the more i add features with Graphs class
 * the more its becoming cumbersome.
 * its either focus on debugging reactivity issues
 * or spend time developing/learning Graphs
 */

import "./styles.css";
import { useState, useEffect } from "react";
import { Graph } from "@/utils/data_structures";
import {
  NetworkDiagram,
  convertEdgeListToD3Links,
  convertAdjListToD3Nodes,
  renderAdjList,
} from "@/components";

const sampleData1Component = {
  "n": 7,
  "edges": [ 
    [0, 1],
    [1, 4],
    [1, 2],
    [1, 3],
    [3, 5],
    [2, 5],
    [4, 2],
    [6, 5]
  ]
}
const sampleData2Component = {
  "n": 7,
  "edges": [ 
    [0, 1],
    [1, 4],
    [1, 2],
    [1, 3],
    [3, 5],
    [5, 0],
    [2, 5]
  ]
}


export default function Network() {
  const [ selectedInputGraph, setSelectedInputGraph ] = useState(sampleData1Component);
  const [ edgeList, setEdgeList ] = useState(selectedInputGraph.edges as any);
  const [ edgeListTextarea, setEdgeListTextarea] = useState(edgeList.join("\n")) as any;

  useEffect(() => {
    setEdgeList(selectedInputGraph.edges);
    setEdgeListTextarea(selectedInputGraph.edges.join("\n"))
  }, [selectedInputGraph])

  const graph = new Graph(selectedInputGraph.n, edgeList);
  const d3_data = {
    nodes: convertAdjListToD3Nodes(graph.adjList),
    links: convertEdgeListToD3Links(edgeList)
  }
  const [ traversal, setTraversal ] = useState([] as any);


  const edgeListInput = (event?: any) => {
    if (!event) return;

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

    setEdgeList([...newVal])
    setEdgeListTextarea([...newVal].join("\n"));
  }


  return (
    <div className="flex flex-col mt-4">
      <div className="absolute z-2 controllers ml-4 grid grid-cols-5">
        <div className="col-span-1">
          <span className="text-gray-400 text-xs mr-2">Edge List</span>
          <br/>
          <textarea
            className="BTextarea bg-neutral-800 w-16 p-2 resize-none"
            rows={9}
            value={edgeListTextarea}
            onChange={edgeListInput}
          />
        </div>

        <div className="col-span-4">
          <span className="text-gray-400 text-xs mr-2">Traversals:</span>
          <div className="inline-block border border-zinc-800 mr-2 mb-1">
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

          <div className="block">
            <div className="px-2 mb-1 border border-zinc-800">
              <span className="text-gray-400 text-xs mr-2">Number of components in undirected graph:</span>
              { graph.numberOfConnectedComponents() }
            </div>
            <div className="px-2 mb-1 border border-zinc-800">
              <span className="text-gray-400 text-xs mr-2">Is Graph a Valid Tree (No cycle & all nodes are connected)?:</span>
              { graph.isGraphValidTree() ? 'Yes' : 'No' }
            </div>
            
          </div>

          <div className="block px-2 border border-zinc-800">
            <span className="text-gray-400 text-xs mr-2">Sample graphs:</span>
            <br/>
            <div className="text-gray-400 text-xs">
              <a className="block cursor-pointer py-1 px-1"
                onClick={() => setSelectedInputGraph(sampleData1Component)}
              >
                graph w/ 1 component
              </a>
              <a className="block cursor-pointer py-1 px-1"
                onClick={() => setSelectedInputGraph(sampleData2Component)}
              >
                graph w/ 2 component
              </a>
              {/**
              <a className="block cursor-pointer py-1 px-1"
                onClick={() => setSelectedInputGraph(sampleData1Component)}
              >
                graph w/ cycle
              </a>
              <a className="block cursor-pointer py-1 px-1"
                onClick={() => setSelectedInputGraph(sampleData1Component)}
              >
                graph w/ no cycle
              </a>
               */}
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <span className="text-gray-400 text-xs mr-2">Adjacency List</span>
          <br />
          {renderAdjList(graph.adjList)}
        </div>
      </div>

      <div className="absolute z-1 bottom-0 right-0">
        <NetworkDiagram
          width={900}
          height={500}
          data={d3_data}
          highlightNodes={traversal}
        />
      </div>
    </div>
  );
}