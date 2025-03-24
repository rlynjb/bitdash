"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Binary Tree UI tutorial: https://www.youtube.com/watch?v=IJP-Iy94WLQ
 */
import "./styles.css";
import { useEffect, useState } from "react";
interface Props {
  data?: any;
  highlightNodes?: any;
}

export const BinaryVisualizer: React.FC<Props> = ({
  data,
  highlightNodes,
}) => {
  const [ html, setHtml ] = useState(``);

  /**
   * Renders Tree in hierarchical order
   * @param tree 
   */
  const renderTree = (tree: any) => {
    const renderNode = (node: any): any => {      
      const { key, left, right } = node;
      const template = `
        <div class="node__element ${highlightNodes && highlightNodes.includes(key) ? 'highlight' : ''}"
          data-node-id="${key}"
        >
          ${key}
        </div>
        ${
          left || right ?
            `
            <div class="node__bottom-line"></div>
            <div class="node__children">
              ${ left ?
              `
                <div class="node node--left">
                  ${renderNode(left)}
                </div>
              `
                : ''
              }
              ${ right ?
              `
                <div class="node node--right">
                  ${renderNode(right)}
                </div>
              `
                : ''
              }
            </div>
            `
          : ''
        }
      `;

      return template;
      
    }

    setHtml(
      `<div class="tree">
        <div class="node node--root">
          ${renderNode(tree)}
        </div>
      </div>
      `
    );
  }

  useEffect(() => {
    if (data && data.root) {
      renderTree(data.root);
    }
  }, [data, renderTree]);

  return (
    <div id="treeWrapper">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}