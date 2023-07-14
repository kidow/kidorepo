import { type FC } from 'react'
import Link from 'next/link'
import { type ToDoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

export interface Props extends ToDoBlockObjectResponse {}

const Todo: FC<Props> = (block) => {
  return (
    <div
      className={classnames('flex items-center gap-2', {
        'text-red-500': block.to_do.color === 'red',
        'text-orange-500': block.to_do.color === 'orange',
        'text-yellow-500': block.to_do.color === 'yellow',
        'text-green-500': block.to_do.color === 'green',
        'text-blue-500': block.to_do.color === 'blue',
        'text-purple-500': block.to_do.color === 'purple',
        'text-pink-500': block.to_do.color === 'pink',
        'text-gray-500': block.to_do.color === 'gray',
        'bg-red-100': block.to_do.color === 'red_background',
        'bg-orange-100': block.to_do.color === 'orange_background',
        'bg-yellow-100': block.to_do.color === 'yellow_background',
        'bg-green-100': block.to_do.color === 'green_background',
        'bg-blue-100': block.to_do.color === 'blue_background',
        'bg-purple-100': block.to_do.color === 'purple_background',
        'bg-pink-100': block.to_do.color === 'pink_background',
        'bg-gray-100': block.to_do.color === 'gray_background'
      })}
    >
      <input
        type="checkbox"
        checked={block.to_do.checked}
        readOnly
        className={classnames(
          'relative h-5 w-5 appearance-none rounded border bg-white checked:before:absolute checked:before:left-1.5 checked:before:top-[3px] checked:before:h-2.5 checked:before:w-1.5 checked:before:rotate-45 checked:before:border-b-2 checked:before:border-r-2 checked:before:border-white',
          {
            'border-slate-500 checked:border-blue-500 checked:bg-blue-500':
              block.to_do.color === 'default',
            'border-red-500 checked:bg-red-500':
              block.to_do.color.startsWith('red'),
            'border-orange-500 checked:bg-orange-500':
              block.to_do.color.startsWith('orange'),
            'border-yellow-500 checked:bg-yellow-500':
              block.to_do.color.startsWith('yellow'),
            'border-green-500 checked:bg-green-500':
              block.to_do.color.startsWith('green'),
            'border-blue-500 checked:bg-blue-500':
              block.to_do.color.startsWith('blue'),
            'border-purple-500 checked:bg-purple-500':
              block.to_do.color.startsWith('purple'),
            'border-pink-500 checked:bg-pink-500':
              block.to_do.color.startsWith('pink'),
            'border-gray-500 checked:bg-gray-500':
              block.to_do.color.startsWith('gray')
          }
        )}
      />
      {block.to_do.rich_text.map((item, key) => {
        const className = {
          'font-semibold': item.annotations.bold,
          italic: item.annotations.italic,
          'line-through': item.annotations.strikethrough,
          underline: item.annotations.underline,
          'notion-code': item.annotations.code
        }
        if (item.href)
          return (
            <Link
              key={key}
              href={item.href}
              target="_blank"
              rel="noopenner referrer"
            >
              <span className={classnames(className, 'underline')}>
                {item.plain_text}
              </span>
            </Link>
          )
        return (
          <span key={key} className={classnames(className)}>
            {item.plain_text}
          </span>
        )
      })}
    </div>
  )
}

export default Todo
