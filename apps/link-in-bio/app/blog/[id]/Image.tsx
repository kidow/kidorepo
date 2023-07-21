import type { FC } from 'react'
import Link from 'next/link'
import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getRichTextClassName } from './utils'

export interface Props extends ImageBlockObjectResponse {}

const Image: FC<Props> = (block) => {
  return (
    <figure>
      {block.image.type === 'external' && (
        <img
          src={block.image.external.url}
          alt=""
          className="mx-auto rounded shadow-md"
        />
      )}
      {block.image.type === 'file' && (
        <img
          src={block.image.file.url}
          alt=""
          className="mx-auto rounded shadow-md"
        />
      )}
      <legend className="mt-2 text-center text-sm text-stone-500">
        {block.image.caption.map((item, key) => {
          const className = getRichTextClassName(item)
          if (item.href)
            return (
              <Link
                key={key}
                href={item.href}
                target="_blank"
                rel="noopenner noreferrer"
              >
                <span className={className}>{item.plain_text}</span>
              </Link>
            )
          return (
            <span className={className} key={key}>
              {item.plain_text}
            </span>
          )
        })}
      </legend>
    </figure>
  )
}

export default Image
