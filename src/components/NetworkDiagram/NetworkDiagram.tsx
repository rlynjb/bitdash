/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

/**
 * Options for Network Diagram
 * 
 * Tutorials:
 * https://d3js.org/d3-selection/selecting
 * https://www.w3schools.com/graphics/svg_intro.asp
 * https://www.react-graph-gallery.com/network-chart
 * https://medium.com/@qdangdo/visualizing-connections-a-guide-to-react-d3-force-graphs-typescript-74b7af728c90
 * 
 * Libraries:
 * https://d3js.org/d3-force
 * https://airbnb.io/visx/gallery?pkg=network
 * 
 * for mouseover and animation of traversals
 * ref: https://jsfiddle.net/2pdxz/2/
 */

import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { Data, Link, Node } from './data';
import { delayLoop } from "@/utils";

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: Data;
  highlightNodes?: any;
};

export const NetworkDiagram = ({
  width,
  height,
  data,
  highlightNodes = [],
}: NetworkDiagramProps) => {
  // The force simulation mutates links and nodes, so create a copy first
  // Node positions are initialized by d3
  //const links: Link[] = data.links.map((d) => ({ ...d }));
  //const nodes: Node[] = data.nodes.map((d) => ({ ...d }));

  //const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // set dimension of the canvas element
    //const canvas = canvasRef.current;
    //const context = canvas?.getContext('2d');

    //if (!context) {
    //  return;
    //}

    const svg = d3.select(svgRef.current);
    svg.attr('width', width).attr('height', height);

    /**
     * run d3-force to find the position of nodes
     */
    const simulation = d3.forceSimulation(data.nodes)
      // list of forces we apply to get node positions
      .force(
        'link',
        d3.forceLink<Node, Link>(data.links).distance(90).id((d: any) => d.id)
      )
      .force('collide', d3.forceCollide().radius(30))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

      // reset
      d3.selectAll('.node').style('fill', 'gray')

      /**
       * at each iteration of the simulation,
       * draw the network diagram with the new node positions
       */
      simulation.on('tick', () => {
        /**
         * TODO: separate SVG chain methods below
         */
        //drawNetwork(context, width, height, nodes, links);
        //drawNetworkSvg(svg, width, height, data.nodes, data.links);


        /**
         * Define Nodes and Links
         */
        const links = svg
          .selectAll('.link')
          .data(data.links)
          .join('line')
          .attr('class', 'link')
          .style('stroke', '#999');

        const nodes = svg
          .selectAll('.node')
          .data(data.nodes)
        
        nodes
          .exit()
          .remove()

        /**
         * Define Group <g> tag
         * and wrap Circle and Text
         */
        const group = nodes
          .enter()
          .append('g')
        
        /**
         * Append Circle to Group
         * and style it up
         */
        group.append('circle')
          .attr('id', (item) => item.id)
          .attr('class', 'node')
          .attr('r', 15)
          .style('fill', 'gray')
          .on('click', (event: any) => {
            const nodeData = event.target.__data__;
            console.log('click', nodeData.id)
            // start traversal in a given node
          })

        /**
         * Define Text <text> tag
         * and pass in Nodes to share its x,y coordinate
         */
        const text = svg
          .selectAll('.text')
          .data(data.nodes)

        text
          .exit()
          .remove()
          .enter()
        
        /**
         * Append <text> to Group
         * and style it up
         */
        group
          .append("text")
          .style('fill', '#fff')
          .style('cursor', 'default')
          .attr('class', 'text')
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text((d: any) => d.id)          

        /**
         * Generate x and y coordinate
         */
        links
          .attr('x1', (d: any): any => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        nodes
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y)

        text
          .attr("x", (d: any) => d.x)
          .attr("y", (d: any) => d.y)

        return () => simulation.stop();
      })
      .on('end', () => {

        // reset
        d3.selectAll('.node').style('fill', 'gray')

        const traverseNodes = async (highlightNodes: any[]) => {
          for (let i=0; i<highlightNodes.length; i++) {
            const query = d3.select(`[id='${highlightNodes[i]}']`)
            query.style('fill', 'red')

            await delayLoop(1000)
          }
        }
  
        traverseNodes(highlightNodes);
      })

      
  }, [data]);


  

  return (
    <div>
      {/**
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
      />
       */}

      <svg ref={svgRef} />

    </div>
  );
};
