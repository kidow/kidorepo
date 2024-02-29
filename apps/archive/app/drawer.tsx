'use client'

import { Fragment, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { filterContents } from '@/services'
import { AlignJustifyIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const DrawerComponent = dynamic(
  () => import('ui').then((components) => components.Drawer.v1),
  { ssr: false }
)

interface Props {
  allLinks: LinkItem['items']
}

export default function Drawer({ allLinks }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setTheme } = useTheme()

  const links: LinkItem[] = useMemo(
    () => [
      { title: 'components', items: filterContents(allLinks, 'components') },
      { title: 'hooks', items: filterContents(allLinks, 'hooks') },
      { title: 'utils', items: filterContents(allLinks, 'utils') },
      { title: 'settings', items: filterContents(allLinks, 'settings') },
      { title: 'tips', items: filterContents(allLinks, 'tips') },
      { title: 'wiki', items: filterContents(allLinks, 'wiki') },
      { title: 'error', items: filterContents(allLinks, 'error') },
      { title: 'algorithm', items: filterContents(allLinks, 'algorithm') }
    ],
    []
  )
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
            <Link href="https://dongwook.kim" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="https://github.com/kidow" target="_blank">
              Github
            </Link>
          </li>
          {links.map((item, key) => (
            <Fragment key={key}>
              <li className="pt-2 font-medium">{item.title}</li>
              {item.items.map((subItem, i) => (
                <li key={i} className="text-neutral-400 dark:text-neutral-500">
                  <Link href={subItem.slug}>{subItem.title}</Link>
                </li>
              ))}
            </Fragment>
          ))}
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
