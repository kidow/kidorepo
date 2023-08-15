'use client'

import { Fragment, memo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ALGORITHM_LINKS, COMPONENTS_LINKS, WIKI_LINKS } from '@/services'
import { AlignJustifyIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const DrawerComponent = dynamic(
  () => import('ui').then((components) => components.Drawer.v1),
  { ssr: false }
)

function Drawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setTheme } = useTheme()
  return (
    <>
      <button className="md:hidden" onClick={() => setIsOpen(true)}>
        <AlignJustifyIcon
          size={24}
          className="text-neutral-500 dark:text-neutral-400"
        />
      </button>
      {/* @ts-ignore */}
      <DrawerComponent
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
      </DrawerComponent>
    </>
  )
}

export default memo(Drawer)
