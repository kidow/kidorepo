'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'utils'

interface Props {
  allLinks: LinkItem['items']
}

function HeaderNav({ allLinks }: Props) {
  const pathname = usePathname()
  const links = [
    {
      title: 'Components',
      slug:
        allLinks.filter((item) => item.slug?.startsWith(`/components`))[0]
          ?.slug || '/'
    },
    {
      title: 'Wiki',
      slug:
        allLinks.filter((item) => item.slug?.startsWith(`/wiki`))[0]?.slug ||
        '/'
    },
    {
      title: 'Algorithm',
      slug:
        allLinks.filter((item) => item.slug?.startsWith(`/algorithm`))[0]
          ?.slug || '/'
    }
  ]
  return (
    <>
      {links.map((item, key) => (
        <Link href={item.slug} key={key}>
          <span
            className={cn(
              'duration-150',
              pathname.startsWith(item.slug)
                ? 'font-medium text-neutral-900 dark:text-neutral-50'
                : 'text-neutral-400 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </>
  )
}

export default HeaderNav
