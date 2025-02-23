/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./styles.css";
import { useEffect, useState } from "react";
import { Graph } from "@/utils/data_structures";
import { NetworkDiagram } from "@/components";


/**
 * convertAdjListToD3Nodes
 * @param {Object}[ 0: {}, 1:{} ]
 * @return {Array}[{ id: '0' }]
 */
const convertAdjListToD3Nodes = (adjList?: any) => {
  if (adjList.length === 0 || adjList === null) return [];

  const result = [];
  for (const key in adjList) {
    result.push({
      id: String(key),
      group: ''
    })
  }
  return result;
}

/**
 * convertEdgeListToD3Links
 * @param {Array}[[0,1], [1,0]]
 * @return {Array}[{ source: '0', target: '1' }]
 */
const convertEdgeListToD3Links = (edgeList?: any) => {
  if (edgeList.length === 0 || edgeList === null) return [];

  const result = [] as any;
  for (let i=0; i<edgeList.length; i++) {
    result.push(
      {
        source: String(edgeList[i][0]),
        target: String(edgeList[i][1]),
        value: 1
      }
    )
  }
  return result;
}

/**
 * renderAdjList
 * @param {Array}adjList
 * @returns {JSX}
 */
const renderAdjList = (adjList?: any) => {
  if (adjList === null || adjList.length === 0) return '<- Enter src & target nodes';

  return (
    <>
      <ul className="text-xs text-gray-400">
        {
          adjList.map((neighbors: any, vertex: any) => {
            return <li key={vertex}
              className="mb-1"
            >
              <div className="bg-neutral-800 py-1 px-2 mr-1 inline-block">
                {vertex}
              </div>
              <span className="text-gray-400">{'->'}</span>

              {neighbors.map((vertexNeighbor: any, regularIndex: any) => {
                return <div
                  key={regularIndex}
                  className="bg-neutral-800 py-1 px-2 ml-1 inline-block">
                  {vertexNeighbor}
                </div>
              })}
            </li>
          })
        }
      </ul>
    </>
  )
}

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

  console.log('testing bfs: ', graph.bfs_traversal(edgeList.length, edgeList))


  /**
   * create adjList using Graph DS
   */
  for (let i=0; i < edgeList.length; i++) {
    graph.addEdge(edgeList[i][0], edgeList[i][1])
  }


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