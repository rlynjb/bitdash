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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const CallstackVisualizer: React.FC<Props> = ({
  data,
}) => {
  const [ html, setHtml ] = useState(``);

  useEffect(() => {
    if (data && data.root) {
      renderTree([data.root]);
    }
  }, [data]);


  /**
   * Renders Tree in hierarchical order
   * @param tree 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTree = (tree: any[]) => {
    /**
     * NOTE:
     * - learned non-linear data strcuture
     * - using Tree data structure to build hierarchy or sequence
     * of an algorithm that uses recursive calls
     * - rendering tree data structure using plain html list tag
     * - alot of recursive calls so understanding callstack is must
     * 
     * solution update:
     * it might be impossible to animate nodes in callstack in/out sequence
     * using Tree Data structure.
     * 
     * an ideal solution might be to use:
     * path = an array sequence (backtracking) of nodes. containing ID or key. can contain source and target.
     * data = a linear data structure contain node infos.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderNode = (node: any[]) => {
      let html = ``;  

      for (let i=0; i<node.length; i++) {
        html += `<li>
          <div class="node">
            <div class="text">
              ${node[i].key}
              <br>
              &#8595;
            </div>
            ${node[i].desc ?
              `<div class="text">
                ${node[i].desc}
              </div>` : ''
            }
            ${node[i].value ?
              `<div class="text">
                &#8593;
                <br>
                ${node[i].value}
              </div>` : ''
            }
          </div>

          ${
            // adds fn to callstack
            node[i].children && node[i].children.length
              ? '<ul>' + renderNode(node[i].children) + '</ul>'
              : ''
          }
        </li>`;
      }

      // pops fn from callstack
      // sethtml here
      setHtml(`<ul>${html}</ul>`);

      return html;
    }

    renderNode(tree);
  }

  return (
    <div id="treeWrapper" className="tree">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}