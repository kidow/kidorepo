'use client'

import Image from 'next/image'
import classnames from 'classnames'
import { ArrowUpRight } from 'lucide-react'
import { Tooltip } from 'ui'

interface Props extends ReactProps {
  duration: string
  image: string
  title: string
  description?: string
  tags?: string[]
  href?: string
}

export default function ResumeItem({
  children,
  duration,
  image,
  title,
  description,
  tags,
  href
}: Props) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:gap-9">
      <div className="w-[142px] tabular-nums tracking-tighter text-neutral-400">
        {duration}
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full">
            <Image
              src={`/resume/${image}`}
              alt={image}
              height={48}
              width={48}
              className="!my-0"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span
                onClick={() => {
                  if (!!href) window.open(href, '_blank')
                }}
                className={classnames({
                  'cursor-pointer hover:underline': !!href
                })}
              >
                {title}
              </span>
              {!!href && <ArrowUpRight size={16} />}
            </div>
            {!!description && (
              <div className="text-xs text-neutral-400">{description}</div>
            )}
          </div>
        </div>
        <div>{children}</div>
        {tags && (
          <ul className="flex !list-none flex-wrap gap-3 !pl-0">
            {tags.map((tag, key) => (
              <li
                key={key}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1"
              >
                <Tooltip content={tag} className="capitalize">
                  <Image
                    src={`/skills/${tag}.png`}
                    alt={tag}
                    draggable={false}
                    height={40}
                    width={40}
                    className="!my-0 select-none"
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
