import type { ReactNode } from 'react'
import { cn } from 'utils'

export interface Props {
  position:
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
  trigger: ReactNode
  list: string[]
  onClick: (index: number) => void
  className?: string
}

function Dropdown({ position, trigger, list, onClick, className }: Props) {
  return (
    <div className="relative inline-block [&>ul]:focus-within:visible [&>ul]:focus-within:scale-100 [&>ul]:focus-within:opacity-100">
      <label tabIndex={0} className="cursor-pointer">
        {trigger}
      </label>
      <ul
        tabIndex={0}
        className={cn(
          'invisible absolute z-50 w-52 scale-95 rounded-md bg-white p-2 opacity-0 shadow transition duration-200 ease-in-out',
          {
            'bottom-full right-0': position === 'top-start',
            'bottom-full left-0': position === 'top-end',
            'bottom-0 left-full': position === 'right-start',
            'left-full top-0': position === 'right-end',
            'right-0 top-full': position === 'bottom-start',
            'left-0 top-full': position === 'bottom-end',
            'bottom-0 right-full': position === 'left-start',
            'right-full top-0': position === 'left-end'
          },
          className
        )}
      >
        {list.map((item, key) => (
          <li
            key={key}
            className="cursor-pointer rounded px-4 py-3 hover:bg-neutral-100"
            onClick={() => onClick(key)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
