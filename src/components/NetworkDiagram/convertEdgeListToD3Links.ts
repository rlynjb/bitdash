/**
 * convertEdgeListToD3Links
 * @param {Array}[[0,1], [1,0]]
 * @return {Array}[{ source: '0', target: '1' }]
 */
export const convertEdgeListToD3Links = (edgeList?: any) => {
  if (edgeList.length === 0 || edgeList === null) return [];

  const result = [] as any;
  for (let i=0; i<edgeList.length; i++) {
    result.push(
      {
        source: String(edgeList[i][0]),
        target: String(edgeList[i][1]),
        value: 1
      }
    )
  }
  return result;
}