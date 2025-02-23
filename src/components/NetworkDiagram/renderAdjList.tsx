/**
 * renderAdjList
 * @param {Array}adjList
 * @returns {JSX}
 */
export const renderAdjList = (adjList?: any) => {
  if (adjList === null || adjList.length === 0) return '<- Enter src & target nodes';

  return (
    <>
      <ul className="text-xs text-gray-400">
        {
          adjList.map((neighbors: any, vertex: any) => {
            return <li key={vertex}
              className="mb-1"
            >
              <div className="bg-neutral-800 py-1 px-2 mr-1 inline-block">
                {vertex}
              </div>
              <span className="text-gray-400">{'->'}</span>

              {neighbors.map((vertexNeighbor: any, regularIndex: any) => {
                return <div
                  key={regularIndex}
                  className="bg-neutral-800 py-1 px-2 ml-1 inline-block">
                  {vertexNeighbor}
                </div>
              })}
            </li>
          })
        }
      </ul>
    </>
  )
}