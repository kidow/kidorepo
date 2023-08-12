'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from 'utils'

interface Props {
  toc: { items?: Item[] }
}

export default function Toc({ toc }: Props) {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-20 -mt-10 max-h-[calc(100vh-4rem)] overflow-y-auto pt-7">
        <div className="space-y-2">
          <p className="font-medium">On This Page</p>
          <Tree tree={toc} activeItem={activeHeading} />
        </div>
      </div>
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

function Tree({
  tree,
  level = 1,
  activeItem
}: {
  tree: {
    items?: Item[]
  }
  level?: number
  activeItem?: string
}) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className="mt-0 pt-2">
            <a
              href={item.url}
              className={cn(
                'inline-block no-underline transition-colors',
                item.url === `#${activeItem}`
                  ? 'font-medium text-neutral-900 dark:text-neutral-50'
                  : 'text-neutral-400 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200'
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
