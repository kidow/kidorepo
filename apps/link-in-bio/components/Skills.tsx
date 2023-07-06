'use client'

import { useMemo } from 'react'
import Image from 'next/image'

export default function Skills() {
  const list: string[] = useMemo(
    () => [
      'react',
      'nextjs',
      'typescript',
      'tailwindcss',
      'supabase',
      'vercel'
    ],
    []
  )
  return (
    <ul className="flex flex-wrap gap-4">
      {list.map((item, key) => (
        <li
          key={key}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1"
        >
          <Image
            src={`/skills/${item}.png`}
            alt={item}
            draggable={false}
            height={40}
            width={40}
          />
        </li>
      ))}
    </ul>
  )
}
