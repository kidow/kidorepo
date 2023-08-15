'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AlignJustifyIcon,
  GithubIcon,
  HomeIcon,
  MoonStarIcon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  ALGORITHM_LINKS,
  COMPONENTS_LINKS,
  HEADER_NAV,
  WIKI_LINKS
} from 'services'
import { Drawer, Dropdown } from 'ui'
import { cn } from 'utils'

import CommandMenu from './command-menu'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
              <button className="md:hidden" onClick={() => setIsOpen(true)}>
                <AlignJustifyIcon
                  size={24}
                  className="text-neutral-500 dark:text-neutral-400"
                />
              </button>
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
      <Drawer.v1
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
      >
        <div>
          <span className="font-bold dark:text-neutral-50">kidow/archive</span>
        </div>
        <ul className="mt-4 h-[calc(100vh-8rem)] space-y-2 overflow-auto">
          <li>
            <Link href="/components/accordion">Components</Link>
          </li>
          <li>
            <Link href="/wiki/commitlint-convention">Wiki</Link>
          </li>
          <li>
            <Link href="/wiki/commitlint-convention">Algorithm</Link>
          </li>
          <li>
            <Link href="https://kidow.me" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="https://github.com/kidow" target="_blank">
              Github
            </Link>
          </li>
          {[...COMPONENTS_LINKS, ...WIKI_LINKS, ...ALGORITHM_LINKS].map(
            (item, key) => (
              <Fragment key={key}>
                <li className="pt-2 font-medium">{item.title}</li>
                {item.items.map((subItem, i) => (
                  <li
                    key={i}
                    className="text-neutral-400 dark:text-neutral-500"
                  >
                    <Link href={subItem.href}>{subItem.title}</Link>
                  </li>
                ))}
              </Fragment>
            )
          )}
          <li className="pt-4 text-sm">
            <div className="relative rounded-md border p-2 dark:border-neutral-700">
              <div className="absolute -top-3 left-4 bg-white px-2 dark:bg-neutral-900">
                <span>Themes</span>
              </div>
              <ul className="py-2">
                <li
                  className="rounded px-2 py-1"
                  onClick={() => setTheme('light')}
                >
                  Light
                </li>
                <li
                  className="rounded px-2 py-1"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </li>
                <li
                  className="rounded px-2 py-1"
                  onClick={() => setTheme('system')}
                >
                  System
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </Drawer.v1>
    </>
  )
}
