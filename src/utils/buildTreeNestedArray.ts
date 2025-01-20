/**
 * TODO:
 * create data structure hierarchy to feed to Callstack Visualizer
 * javascript add object to dynamic nested array children
 * 
 * ref: https://www.google.com/search?q=javascript+add+object+to+dynamic+nested+array+children&sca_esv=7df2d13addd274b4&sxsrf=ADLYWIKOf5_XBYfFBNtDVZ77X_bl5PL_yw%3A1737343816380&ei=SMONZ7jvFtq8kPIPwafFiQo&ved=0ahUKEwi4s5yIroOLAxVaHkQIHcFTMaEQ4dUDCBA&uact=5&oq=javascript+add+object+to+dynamic+nested+array+children&gs_lp=Egxnd3Mtd2l6LXNlcnAiNmphdmFzY3JpcHQgYWRkIG9iamVjdCB0byBkeW5hbWljIG5lc3RlZCBhcnJheSBjaGlsZHJlbkiyFFCwCVjiEnABeACQAQCYAVGgAaAEqgEBOLgBA8gBAPgBAZgCBKAC2AHCAgsQABiwAxiiBBiJBcICCBAAGLADGO8FwgIHECMYsAIYJ5gDAIgGAZAGBZIHATSgB8oS&sclient=gws-wiz-serp
 */

/**
 * Build Tree Nested Array
 * 
 * @param array
 * @param path 
 * @param newObject 
 * @returns result
 * 
 * return an array of built or updated tree data structure
 */
export const buildTreeNestedArray = (array: any[] = [], path: any[], newObject: any) => {
  if (path.length === 0) {
    return [];
  }

  const key = path[0];
  const index = array.findIndex(item => item.id === key);

  if (index !== -1) {
    buildTreeNestedArray(array[index].children, path.slice(1), newObject);
  } else {
    // If the path doesn't exist, create it
    const newChild = { id: key, children: [] };
    array.push(newChild);
    buildTreeNestedArray(newChild.children, path.slice(1), newObject);
  }

  console.log('res', array)

  return array;
}