"use client";

/**
 * Options for Network Diagram
 * 
 * Tutorials:
 * https://www.react-graph-gallery.com/network-chart
 * https://medium.com/@qdangdo/visualizing-connections-a-guide-to-react-d3-force-graphs-typescript-74b7af728c90
 * 
 * Libraries:
 * https://d3js.org/d3-force
 * https://airbnb.io/visx/gallery?pkg=network
 */

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { RADIUS, drawNetwork } from './drawNetwork';
import { Data, Link, Node } from './data';

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: Data;
};

export const NetworkDiagram = ({
  width,
  height,
  data,
}: NetworkDiagramProps) => {
  // The force simulation mutates links and nodes, so create a copy first
  // Node positions are initialized by d3
  const links: Link[] = data.links.map((d) => ({ ...d }));
  const nodes: Node[] = data.nodes.map((d) => ({ ...d }));

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // set dimension of the canvas element
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    // run d3-force to find the position of nodes on the canvas
    d3.forceSimulation(nodes)
      // list of forces we apply to get node positions
      .force(
        'link',
        d3.forceLink<Node, Link>(links).distance(90).id((d: any) => d.id)
      )
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

      // at each iteration of the simulation, draw the network diagram with the new node positions
      .on('tick', () => {
        drawNetwork(context, width, height, nodes, links);
      });
  }, [width, height, nodes, links]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
      />
    </div>
  );
};
