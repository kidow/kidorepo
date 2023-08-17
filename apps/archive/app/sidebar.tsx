'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { filterContents } from '@/services'
import { cn } from 'utils'

interface Props {
  allLinks: LinkItem['items']
}

export default function Sidebar({ allLinks }: Props) {
  const pathname = usePathname()
  const links: LinkItem[] = useMemo(() => {
    if (pathname.startsWith('/wiki') || pathname.startsWith('/error')) {
      return [
        { title: 'wiki', items: filterContents(allLinks, 'wiki') },
        { title: 'error', items: filterContents(allLinks, 'error') }
      ]
    }
    if (pathname.startsWith('/algorithm')) {
      return [
        { title: 'algorithm', items: filterContents(allLinks, 'algorithm') }
      ]
    }

    return [
      { title: 'components', items: filterContents(allLinks, 'components') },
      { title: 'hooks', items: filterContents(allLinks, 'hooks') },
      { title: 'utils', items: filterContents(allLinks, 'utils') },
      { title: 'settings', items: filterContents(allLinks, 'settings') },
      { title: 'tips', items: filterContents(allLinks, 'tips') }
    ]
  }, [pathname, allLinks])
  return (
    <aside className="fixed top-14 z-10 hidden h-[calc(100vh-4rem-1px)] w-full shrink-0 overflow-y-auto py-6 pr-2 md:sticky md:block lg:py-10">
      <nav className="w-full">
        {links.map(({ items, title }, key) => (
          <div className="pb-4" key={key}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold capitalize">
              {title}
            </h4>
            {!!items && !!items.length && (
              <ul className="grid grid-flow-row auto-rows-max text-sm">
                {items.map((item, key) => (
                  <li key={key}>
                    <Link
                      href={item.slug}
                      className={cn(
                        'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                        pathname === item.slug
                          ? 'font-medium text-neutral-900 dark:text-neutral-50'
                          : 'text-neutral-500 dark:text-neutral-400'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
