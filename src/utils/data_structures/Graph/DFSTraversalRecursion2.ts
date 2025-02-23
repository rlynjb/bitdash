/**
 * Solution that contains:
 * Finding connected components of a graph
 */

const adjacencyList = [] as any;
const visited = [] as any;
const result = [] as any;


function dfs(source: any, component: any) {
    
    // Add a verex to the result and mark as visited
    result.push(source);
    visited[source] = component;
    
    // Get the current vertex neighbors and traverse throught the unvisited ones.
    const neighbors = adjacencyList[source];
    
    for(let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if(visited[neighbor] === null){
            dfs(neighbor, component);
        }
    }
}

/**
 * @param {int32} n
 * @param {list_list_int32} edges
 * @return {list_int32}
 */
function dfs_traversal2(n: any, edges: any): any {
    
    // track which component we are traversing through
    let component = 0;
    
    //Initialize adjacency list
    for(let i = 0; i < n; i++) {
        adjacencyList.push([]);
        visited.push(null);
    }
    
    //Build adjacency list
    for(let i = 0; i < edges.length; i++) {
        const vertex1 = edges[i][0];
        const vertex2 = edges[i][1];
        
        adjacencyList[vertex1].push(vertex2);
        adjacencyList[vertex2].push(vertex1);
    }
    
    //Traverse from a source.
    dfs(0, component);
    
    //Traverse through any unvisited verticies.
    for(let i = 0; i < visited.length; i++) {
        if(visited[i] === null){
            component++;
            dfs(i, component);
        }
    }
    return result;
}