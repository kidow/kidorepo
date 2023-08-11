'use client'

import { useId, useRef, useState } from 'react'
import { useOnClickOutside } from 'hooks'
import { createPortal } from 'react-dom'

export interface Props {
  list: string[]
  onClick: (index: number) => void
  label?: string
}

function Dropdown({ list, onClick, label }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLButtonElement>(null)
  const targetRef = useRef<HTMLUListElement>(null)
  const id = useId()

  useOnClickOutside(targetRef, () => setIsOpen(false), id)
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id={id}
        ref={ref}
        className="inline-flex items-center rounded-md px-4 py-2 text-sm text-neutral-700 after:ml-2 after:block after:h-1.5 after:w-1.5 after:rotate-45 after:border-b after:border-r after:border-neutral-700 after:bg-transparent after:content-[''] hover:bg-neutral-50 dark:text-neutral-400 dark:after:border-neutral-500 dark:hover:bg-neutral-800"
      >
        {label}
      </button>
      {isOpen &&
        createPortal(
          <div
            style={{
              left: ref.current!.getBoundingClientRect().left,
              top:
                window.scrollY +
                ref.current!.getBoundingClientRect().top +
                ref.current!.clientHeight,
              minWidth: ref.current!.getBoundingClientRect().width
            }}
            className="absolute z-[9999]"
          >
            <ul
              className="z-10 rounded-md bg-neutral-50 p-1 text-neutral-700 shadow-xl dark:bg-neutral-800 dark:text-neutral-50"
              role="menu"
              tabIndex={0}
              ref={targetRef}
            >
              {list.map((item, key) => (
                <li
                  className="cursor-pointer rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  role="menuitem"
                  tabIndex={-1}
                  key={key}
                  onClick={() => {
                    onClick(key)
                    setIsOpen(false)
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  )
}

export default Dropdown
