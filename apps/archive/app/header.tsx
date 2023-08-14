'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubIcon, HomeIcon, MoonStarIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { createPortal } from 'react-dom'
import { HEADER_NAV } from 'services'
import { Dropdown } from 'ui'
import { cn } from 'utils'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const { setTheme } = useTheme()

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
      <header className="sticky top-0 z-20 w-full border-b bg-white dark:border-neutral-800 dark:bg-neutral-950">
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
            <button className="dark:hover:bg-neutral-00 inline-flex items-center justify-between gap-4 rounded-md border px-4 py-2 text-sm text-neutral-400 duration-150 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-300">
              <span className="hidden lg:inline-block">
                Search Documentation...
              </span>
              <span className="lg:hidden">Search...</span>
              <kbd className="select-none rounded-md bg-neutral-200 px-1.5 py-0.5 text-[10px] dark:bg-neutral-800">
                <span className="mr-1 text-xs">⌘</span>K
              </kbd>
            </button>
            <div className="flex items-center gap-4">
              <Link href="https://kidow.me" target="_blank">
                <HomeIcon
                  size={24}
                  className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                />
              </Link>
              <Link
                href="https://github.com/kidow/kidorepo/tree/main/apps/archive"
                target="_blank"
              >
                <GithubIcon
                  size={24}
                  className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                />
              </Link>
              <Dropdown.v2
                position="bottom-start"
                className="h-6"
                onClick={(index) => {
                  if (index === 0) setTheme('light')
                  else if (index === 1) setTheme('dark')
                  else if (index === 2) setTheme('system')
                }}
                list={['Light', 'Dark', 'System']}
                trigger={
                  <button>
                    <MoonStarIcon
                      size={24}
                      className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                    />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </header>
      {isOpen && (
        <>
          {createPortal(
            <div className="fixed inset-0 z-30">asd</div>,
            document.body
          )}
        </>
      )}
    </>
  )
}
