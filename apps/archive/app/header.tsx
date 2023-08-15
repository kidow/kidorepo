'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubIcon, HomeIcon, MoonStarIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { HEADER_NAV } from 'services'
import { Dropdown } from 'ui'
import { cn } from 'utils'

import CommandMenu from './command-menu'
import Drawer from './drawer'

export default function Header() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="font-bold dark:text-neutral-50">
                kidow/archive
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
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
            <CommandMenu />
            <div className="flex items-center gap-4">
              <Drawer />
              <Link
                href="https://kidow.me"
                target="_blank"
                className="hidden md:inline-block"
              >
                <HomeIcon
                  size={24}
                  className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                />
              </Link>
              <Link
                href="https://github.com/kidow/kidorepo/tree/main/apps/archive"
                target="_blank"
                className="hidden md:inline-block"
              >
                <GithubIcon
                  size={24}
                  className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                />
              </Link>
              <Dropdown.v2
                position="bottom-start"
                className="hidden h-6 md:inline-block"
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
    </>
  )
}
