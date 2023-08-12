'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ALGORITHM_LINKS, COMPONENTS_LINKS, WIKI_LINKS } from 'services'
import { cn } from 'utils'

export default function Sidebar() {
  const pathname = usePathname()
  const links: SidebarItem[] = useMemo(() => {
    if (pathname.startsWith('/wiki')) return WIKI_LINKS
    else if (pathname.startsWith('/algorithm')) return ALGORITHM_LINKS
    return COMPONENTS_LINKS
  }, [pathname])
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-4rem-1px)] w-full shrink-0 overflow-y-auto py-6 pr-2 md:sticky md:block lg:py-10">
      <nav className="w-full">
        {links.map(({ items, title }, key) => (
          <div className="pb-4" key={key}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {title}
            </h4>
            {!!items && !!items.length && (
              <ul className="grid grid-flow-row auto-rows-max text-sm">
                {items.map((item, key) => (
                  <li key={key}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className={cn(
                        'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                        pathname === item.href
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
