/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';
export const RADIUS = 20;

export const drawNetworkSvg = (
  svg: any,
  nodes: any,
  links: any
) => {
const drawLinks = svg
          .selectAll('.link')
          .data(links)
          .join('line')
          .attr('class', 'link')
          .style('stroke', '#999');

        const drawNodes = svg
          .selectAll('.node')
          .data(nodes)
        
        nodes
          .exit()
          .remove()

        // set text its own x and y coordinate
        const drawText = svg
          .selectAll('.text')
          .data(nodes)

          drawText
          .exit()
          .remove()
          .enter()

        const group = nodes.enter().append('g')
        
        group.append('circle')
          //.join('circle')
          .attr('class', 'node')
          .attr('r', 15)
          .style('fill', 'gray')
          
        group.append("text")
          .style('fill', '#fff')
          .attr('class', 'text')
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text((d: any) => d.id)          


        // Generate x and y coordinate
        drawLinks
          .attr('x1', (d: any): any => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        drawNodes
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y)

          drawText
          .attr("x", (d: any) => d.x)
          .attr("y", (d: any) => d.y)

};

