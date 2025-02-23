/**
 * convertAdjListToD3Nodes
 * @param {Object}[ 0: {}, 1:{} ]
 * @return {Array}[{ id: '0' }]
 */
export const convertAdjListToD3Nodes = (adjList?: any) => {
  if (adjList.length === 0 || adjList === null) return [];

  const result = [];
  for (const key in adjList) {
    result.push({
      id: String(key),
      group: ''
    })
  }
  return result;
}