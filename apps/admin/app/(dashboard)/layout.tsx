'use client'

import { useState } from 'react'
import classnames from 'classnames'
import { Menu } from 'lucide-react'

export default function Layout({ children }: ReactProps) {
  const [isMenuOpen, setMenuOpen] = useState(false)
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
          'fixed z-10 flex h-full w-full transform flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div>menu</div>
      </div>
      <div className="min-h-screen dark:bg-black sm:pl-60">
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
          {children}
        </div>
      </div>
    </>
  )
}
