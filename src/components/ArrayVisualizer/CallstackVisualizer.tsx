"use client";

/**
 * how to represent a tree diagram object in javascript data structure
 * ref: https://www.google.com/search?q=how+to+represent+a+tree+diagram+object+in+javascript+data+structure&oq=how+to+represent+a+tree+diagram+object+in+javascript+data+structure&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE1MjA2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
 * 
 * Pure html/css tree diagram
 * ref: ref: https://codepen.io/philippkuehn/pen/QbrOaN
 */

import "./styles.css";
import { useEffect, useState } from "react";

interface Props {
  data: TreeNodeProp[]
}

export interface TreeNodeProp {
  n: number;
  value?: number;
  children?: TreeNodeProp[];
}

/**
 * TODO:
 * - see how CallstackVisualizer html structure
 * when rendering Recursion calls or JS call stack
 * - what data structure to use to construct call stack data
 * to be pass to visualizer component
 * 
 * idea: it can be listed as array or object with "n" pproperty as access key
 * treeNode = [
 *    {
 *      n,
 *      value: result,
 *      children: []
 *    }
 *  ]
 */

export const CallstackVisualizer: React.FC<Props> = ({
  data = []
}) => {
  const [ callstack ] = useState(data);


  useEffect(() => {
    console.log('asd', callstack)
  }, [callstack]);


  const renderNestedArray = (arr: TreeNodeProp[]) => {
    return arr.map((item: TreeNodeProp, index: number) => {
      if (Array.isArray(item.children)) {
        // Recursively render nested arrays
        return (
          <li key={index}>
            <div className="node">{item.n}</div>
            <ul key={index}>
              {renderNestedArray(item.children)}
            </ul>
          </li>
        );
      } else {
        // Render non-array items
        return <li key={index}>
          <div className="node">{item.n}</div>
        </li>;
      }
    });
  }


  return (
    <div className="tree">
      <ul>
        {renderNestedArray(callstack)}
      </ul>
    </div>
  );
}