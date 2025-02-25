export const renderAdjMatrix = (adjMatrix: any) => {
  return (
    <div className="adjMatrix text-xs text-gray-400">
      <div className="flex xVertex">
        <div className="cell bg-neutral-800 py-1 px-2"></div>
        {adjMatrix.map((xVertex: any, xVertexKey: any) => {
          return <div key={xVertexKey}
            className="cell bg-neutral-800 py-1 px-2"
          >
            {xVertexKey}
          </div>
        })}
      </div>
      {adjMatrix.map((i: any, k: any) => {
        return <div key={k}
          className="flex"
        >
          <div className="cell bg-neutral-800 py-1 px-2 yVertex">{k}</div> {i.map((r: any, rk: any) => {
            return <div key={rk}
              className="cell bg-neutral-800 py-1 px-2"
            >
              {String(r ? 1 : 0)}
            </div>
          })}
        </div>
      })}
    </div>
  );
}