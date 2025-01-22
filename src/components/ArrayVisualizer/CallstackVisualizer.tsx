"use client";

import { Chilanka } from "next/font/google";
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
  data?: any;
}

const test = {
  root: {
    key: 3,
    children: [
      {
        key: 2,
        children: [
          {
            key: 1,
            children: [
              {
                key: 0,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
}

export const CallstackVisualizer: React.FC<Props> = ({
  data,
}) => {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (data && data.root) {
      setLocalData([data.root]);
    }
  }, [data]);


  const renderNestedObject = (obj: any) => {
    if (Array.isArray(obj)) {
      return (
        obj.map((item: any, ind: any) => {
          return (
            <li key={ind}>
              <div className="node">{item.key}</div>

              <ul>
                {renderNestedObject(item.children)}
              </ul>
            </li>
          )
        })
      );
    }
  };


  return (
    <div id="treeWrapper" className="tree">
      <ul>
        {renderNestedObject(localData)}
      </ul>
    </div>
  );
}