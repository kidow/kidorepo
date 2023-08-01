import { memo } from 'react'

function Loader() {
  return (
    <li className="overflow-hidden rounded-[10px] border border-slate-200">
      <div className="h-[260px] animate-pulse bg-slate-200" />
      <div className="space-y-4 p-5 xl:p-6">
        <div className="h-8 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 animate-pulse rounded-full bg-slate-200" />
      </div>
    </li>
  )
}

export default memo(Loader)
