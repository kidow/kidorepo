import type { FC } from 'react'
import Link from 'next/link'
import { type ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

export interface Props extends ImageBlockObjectResponse {}

const Image: FC<Props> = (block) => {
  return (
    <figure>
      {block.image.type === 'external' && (
        <img src={block.image.external.url} alt="" />
      )}
      {block.image.type === 'file' && <img src={block.image.file.url} alt="" />}
      <legend className="text-center text-sm text-stone-500">
        {block.image.caption.map((item, key) => {
          const className = classnames({
            'font-semibold': item.annotations.bold,
            italic: item.annotations.italic,
            'line-through': item.annotations.strikethrough,
            underline: item.annotations.underline,
            'notion-code': item.annotations.code,
            'text-red-500': item.annotations.color === 'red',
            'text-orange-500': item.annotations.color === 'orange',
            'text-yellow-500': item.annotations.color === 'yellow',
            'text-green-500': item.annotations.color === 'green',
            'text-blue-500': item.annotations.color === 'blue',
            'text-purple-500': item.annotations.color === 'purple',
            'text-pink-500': item.annotations.color === 'pink',
            'text-gray-500': item.annotations.color === 'gray',
            'text-yellow-900': item.annotations.color === 'brown',
            'bg-red-100': item.annotations.color === 'red_background',
            'bg-orange-100': item.annotations.color === 'orange_background',
            'bg-yellow-100': item.annotations.color === 'yellow_background',
            'bg-green-100': item.annotations.color === 'green_background',
            'bg-blue-100': item.annotations.color === 'blue_background',
            'bg-purple-100': item.annotations.color === 'purple_background',
            'bg-pink-100': item.annotations.color === 'pink_background',
            'bg-gray-100': item.annotations.color === 'gray_background',
            'bg-amber-100': item.annotations.color === 'brown_background'
          })
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
