'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Divider } from 'ui'
import { backdrop, cn, toast } from 'utils'

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
          <Divider.v1 />
          <Feedback />
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
                  ? 'text-neutral-900 dark:text-neutral-50'
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

function Feedback() {
  const { register, handleSubmit, reset } = useForm<{ content: string }>()
  const pathname = usePathname()

  const onSubmit = async (data: { content: string }) => {
    if (!data.content) return
    if (!window.confirm('피드백을 전달하시겠습니까?')) return

    backdrop(true)
    await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        content: `[${data.content}](https://archive.dongwook.kim${pathname})`
      })
    })
    backdrop(false)
    toast.success('감사합니다!')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register('content', { required: true })}
        required
        className="w-full rounded-md border bg-transparent p-2 text-sm outline-none dark:border-neutral-800 dark:placeholder:text-neutral-600"
        autoComplete="off"
        placeholder="오타나 잘못된 정보가 있나요?"
        rows={4}
      />
      <div className="mt-1 flex justify-end">
        <button className="rounded border px-2 py-1 text-sm text-neutral-400 duration-150 hover:text-neutral-500 dark:border-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400">
          전달
        </button>
      </div>
    </form>
  )
}
