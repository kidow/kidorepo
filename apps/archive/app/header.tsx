'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#111]">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center">
          <Link href="/">
            <span className="font-bold text-neutral-50">kidow/archive</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <li>Components</li>
            <li>Hooks</li>
            <li>Utils</li>
            <li>Wiki</li>
            <li>Algorithm</li>
          </nav>
        </div>
        <button></button>
      </div>
    </header>
  )
}
