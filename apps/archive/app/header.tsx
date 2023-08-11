'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubIcon, HomeIcon, MoonStarIcon } from 'lucide-react'
import { HEADER_NAV } from 'services'
import { cn } from 'utils'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="font-bold dark:text-neutral-50">
                kidow/archive
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              {HEADER_NAV.map((item, key) => (
                <Link href={item.href} key={key}>
                  <span
                    className={cn(
                      'duration-150',
                      pathname.startsWith(item.href)
                        ? 'font-medium text-neutral-900 dark:text-neutral-50'
                        : 'text-neutral-400 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center justify-between gap-4 rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-400 duration-150 hover:bg-neutral-800 hover:text-neutral-300">
              <span className="hidden lg:inline-block">
                Search Documentation...
              </span>
              <span className="lg:hidden">Search...</span>
              <kbd className="select-none rounded-md bg-neutral-800 px-1.5 py-0.5 text-[10px]">
                <span className="mr-1 text-xs">⌘</span>K
              </kbd>
            </button>
            <div className="flex items-center gap-4">
              <Link href="https://kidow.me" target="_blank">
                <HomeIcon
                  size={24}
                  className="text-neutral-400 duration-150 hover:text-neutral-50"
                />
              </Link>
              <Link
                href="https://github.com/kidow/kidorepo/tree/main/apps/archive"
                target="_blank"
              >
                <GithubIcon
                  size={24}
                  className="text-neutral-400 duration-150 hover:text-neutral-50"
                />
              </Link>
              <button>
                <MoonStarIcon
                  size={24}
                  className="text-neutral-400 duration-150 hover:text-neutral-50"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
