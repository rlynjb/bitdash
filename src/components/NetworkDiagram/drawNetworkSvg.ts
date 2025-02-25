/* eslint-disable @typescript-eslint/no-explicit-any */
/*
import { Link, Node } from './data';

export const RADIUS = 20;
const LINK_WIDTH = 1;

export const drawNetworkSvg = (
  svg: SVGSVGElement,
  width: number,
  height: number,
  nodes: Node[],
  links: Link[]
) => {
  const links = svg.selectAll('.link')
      .data(data.links)
      .join('line')
      .attr('class', 'link')
      .style('stroke', '#999');

    const nodes = svg.selectAll('.node')
      .data(data.nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .style('fill', '#69b3a2');
  
  context.clearRect(0, 0, width, height);

  // Draw the links first
  links.forEach((link: any) => {
    context.beginPath();
    context.moveTo(link.source.x, link.source.y);
    context.lineTo(link.target.x, link.target.y);
    context.strokeStyle = "#404040";
    context.stroke();
  });

  // Draw the nodes
  nodes.forEach((node: any) => {
    if (!node.x || !node.y) {
      return;
    }

    context.beginPath();
    context.moveTo(node.x + RADIUS, node.y);
    
    context.fillStyle = '#5f5e5e';
    context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = '#fff';
    context.font = "12px arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(node.id, node.x, node.y);
  });
  
};
*/
