import type { FC } from 'react'
import Link from 'next/link'
import type {
  BlockObjectResponse,
  ToggleBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'
import { TriangleIcon } from 'lucide-react'

export interface Props extends ToggleBlockObjectResponse {
  subBlocks?: BlockObjectResponse[]
}

const Toggle: FC<Props> = ({ toggle, has_children, subBlocks }) => {
  return (
    <button className="group block text-left focus:outline-none">
      <div className="inline-flex items-center gap-2">
        <TriangleIcon
          size={16}
          className="rotate-90 duration-150 group-focus:rotate-180"
        />
        <div>
          {toggle.rich_text.map((item, key) => {
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
              'bg-amber-100': item.annotations.color === 'brown_background',
              'cursor-pointer': has_children
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
      {!!subBlocks && (
        <section className="ml-6 hidden cursor-text select-text group-focus:block">
          {subBlocks.map((block) => {
            if (block.type === 'paragraph') {
              return (
                <p key={block.id}>
                  {block.paragraph.rich_text.map((item, key) => {
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
                      'bg-orange-100':
                        item.annotations.color === 'orange_background',
                      'bg-yellow-100':
                        item.annotations.color === 'yellow_background',
                      'bg-green-100':
                        item.annotations.color === 'green_background',
                      'bg-blue-100':
                        item.annotations.color === 'blue_background',
                      'bg-purple-100':
                        item.annotations.color === 'purple_background',
                      'bg-pink-100':
                        item.annotations.color === 'pink_background',
                      'bg-gray-100':
                        item.annotations.color === 'gray_background',
                      'bg-amber-100':
                        item.annotations.color === 'brown_background'
                    })
                    if (item.href) {
                      return (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopenner noreferrer"
                          key={key}
                        >
                          <span className={className}>{item.plain_text}</span>
                        </Link>
                      )
                    }
                    return (
                      <span className={className} key={key}>
                        {item.plain_text}
                      </span>
                    )
                  })}
                </p>
              )
            }
            return null
          })}
        </section>
      )}
    </button>
  )
}

export default Toggle
