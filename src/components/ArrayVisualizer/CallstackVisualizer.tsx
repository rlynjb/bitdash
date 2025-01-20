"use client";

/**
 * how to represent a tree diagram object in javascript data structure
 * ref: https://www.google.com/search?q=how+to+represent+a+tree+diagram+object+in+javascript+data+structure&oq=how+to+represent+a+tree+diagram+object+in+javascript+data+structure&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE1MjA2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
 * 
 * Pure html/css tree diagram
 * ref: ref: https://codepen.io/philippkuehn/pen/QbrOaN
 * 
 * react render dynamic deep nested array
 * ref: https://www.google.com/search?q=react+render+dynamic+deep+nested+array&sca_esv=ebba48329cc6833c&sxsrf=ADLYWILARzTzS59EpdoQBhX_2NVY0SmvPw%3A1737326152217&ei=SH6NZ6_8DK7JkPIPhK7QmAM&ved=0ahUKEwivwKWh7IKLAxWuJEQIHQQXFDMQ4dUDCBA&uact=5&oq=react+render+dynamic+deep+nested+array&gs_lp=Egxnd3Mtd2l6LXNlcnAiJnJlYWN0IHJlbmRlciBkeW5hbWljIGRlZXAgbmVzdGVkIGFycmF5MggQIRigARjDBDIIECEYoAEYwwRIwURQsQpYrEFwBXgAkAEAmAFYoAH2CKoBAjE2uAEDyAEA-AEBmAIUoALdCMICChAAGLADGNYEGEfCAgQQIxgnwgIFEAAY7wXCAggQABiiBBiJBcICCBAAGIAEGKIEwgIEEAAYHsICCxAAGIAEGIYDGIoFwgIIEAAYBxgIGB7CAgoQIRigARjDBBgKmAMAiAYBkAYDkgcCMjCgB6o-&sclient=gws-wiz-serp
 */

import "./styles.css";
import { useEffect, useState } from "react";

interface Props {
  data: TreeNodeProp[] | undefined
}

export interface TreeNodeProp {
  id: number;
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
  const [localData] = useState(data);

  useEffect(() => {
    console.log('CV - ', data)
  }, [data]);

  const renderNestedArray = (arr: TreeNodeProp[]) => {
    return arr.map((item: TreeNodeProp, index: number) => {
      if (Array.isArray(item.children)) {
        // Recursively render nested arrays
        return (
          <li key={index}>
            <div className="node">{item.id}</div>
            <ul key={index}>
              {renderNestedArray(item.children)}
            </ul>
          </li>
        );
      } else {
        // Render non-array items
        return <li key={index}>
          <div className="node">{item.id}</div>
        </li>;
      }
    });
  }


  return (
    <div className="tree">
      <ul>
        {renderNestedArray(data)}
      </ul>
    </div>
  );
}