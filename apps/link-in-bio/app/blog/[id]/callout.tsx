import type { FC } from 'react'
import Link from 'next/link'
import { type CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

export interface Props extends CalloutBlockObjectResponse {}

const Callout: FC<Props> = (block) => {
  return (
    <div className="flex items-center gap-2 border py-4 pl-3 pr-4">
      <span>
        {block.callout.icon.type === 'file' && (
          <img
            src={block.callout.icon.file.url}
            alt=""
            className="m-0 h-5 w-5 object-cover"
          />
        )}
        {block.callout.icon.type === 'external' && (
          <img
            src={block.callout.icon.external.url}
            alt=""
            className="m-0 h-5 w-5 object-cover"
          />
        )}
        {block.callout.icon.type === 'emoji' && block.callout.icon.emoji}
      </span>
      <div>
        {block.callout.rich_text.map((item, key) => {
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
      </div>
    </div>
  )
}

export default Callout
