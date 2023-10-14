'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Tooltip } from 'ui'

export default function Tools(): JSX.Element {
  const list: string[] = useMemo(
    () => [
      'supabase',
      'vercel',
      'notion',
      'figma',
      'slack',
      'trello',
      'github',
      'todoist'
    ],
    []
  )
  return (
    <ul className="flex flex-wrap gap-4">
      {list.map((item, key) => (
        <Tooltip.v1 key={key} content={item} className="capitalize">
          <li className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1">
            <Image
              src={`/tools/${item}.png`}
              alt={item}
              draggable={false}
              height={30}
              width={30}
              className="select-none"
            />
          </li>
        </Tooltip.v1>
      ))}
    </ul>
  )
}
