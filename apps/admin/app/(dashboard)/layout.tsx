'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { Home, Menu } from 'lucide-react'
import { NAV_ITEMS } from 'services'

export default function Layout({ children }: ReactProps) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  return (
    <>
      <button
        className="fixed right-5 top-7 z-20 sm:hidden"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <Menu size={20} />
      </button>
      <div
        className={classnames(
          'fixed z-10 flex h-full w-full transform flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ul className="grid gap-1">
          <li>
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-md p-1 duration-150 hover:bg-stone-200"
            >
              <Home size={16} />
            </Link>
          </li>
          {NAV_ITEMS.map((item, key) => (
            <li key={key}>
              <Link
                href={item.href}
                className={classnames(
                  'flex items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out',
                  pathname.startsWith(item.href)
                    ? 'bg-stone-200 font-semibold'
                    : 'hover:bg-stone-200 active:bg-stone-300'
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-h-screen sm:pl-60">
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
          {children}
        </div>
      </div>
    </>
  )
}
