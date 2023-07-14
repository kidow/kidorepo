import type { FC } from 'react'
import Link from 'next/link'
import { type BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Props extends BookmarkBlockObjectResponse {
  title: string
  description: string
  image: string
}

const Bookmark: FC<Props> = ({ title, description, image, ...block }) => {
  return (
    <Link
      href={block.bookmark.url}
      target="_blank"
      rel="noopenner noreferrer"
      className="relative my-5 flex select-none flex-wrap-reverse items-stretch overflow-hidden rounded border text-left no-underline"
    >
      <div className="flex min-h-[106px] flex-[4_1_180px] flex-col gap-1 overflow-hidden px-4 py-3 text-left duration-150 hover:bg-neutral-100">
        <div className="text-sm text-stone-800">{title}</div>
        <div className="flex-1 text-xs text-stone-400">{description}</div>
        <div className="text-xs text-stone-500">{block.bookmark.url}</div>
      </div>
      <div className="relative flex-[1_1_180px]">
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src={image}
              alt=""
              className="m-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Bookmark
