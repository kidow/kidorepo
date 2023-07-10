'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { NAV_ITEMS } from 'services'

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <ul>
      {NAV_ITEMS.map(({ items, title }, key) => (
        <li className="pb-4" key={title}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {title}
          </h4>
          {!!items.length && (
            <ul className="grid grid-flow-row auto-rows-max text-sm">
              {items.map((item, key) => (
                <li key={key}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className={classnames(
                      'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                      pathname === item.href
                        ? 'font-medium text-neutral-50'
                        : ''
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
