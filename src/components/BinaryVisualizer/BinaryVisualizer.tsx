"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Binary Tree UI tutorial: https://www.youtube.com/watch?v=IJP-Iy94WLQ
 */
import "./styles.css";
import { useEffect, useState } from "react";

interface Props {
  data?: any;
}

export const BinaryVisualizer: React.FC<Props> = ({
  data,
}) => {
  const [ html, setHtml ] = useState(``);

  useEffect(() => {
    if (data && data.root) {
      renderTree(data.root);
    }
  }, [data]);

  /**
   * Renders Tree in hierarchical order
   * @param tree 
   */
  const renderTree = (tree: any) => {


    const renderNode = (node: any): any => {
      const { key, left, right } = node;
      const template = `
        <div class="node__element">${key}</div>
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

  return (
    <div id="treeWrapper" className="tree">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}