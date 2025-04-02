export const LinearDataVisualizer = ({data, highlightElements}: any) => {
  return (
    <div className="LinearDataVisualizer flex justify-center">
      {data.map((val: any, key: any) => 
        <div key={key} className={`LinearDataVisualizer--element w-[2.3em] h-[2.3em] text-center py-[6px] bg-neutral-500 m-[5px] text-xs ${highlightElements && highlightElements.includes(val) ? 'bg-red-600' : ''}`}>
          {val}
        </div>
      )}
    </div>
  )
}