import type { FC } from 'react'
import Link from 'next/link'
import { type CommentObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface Props extends CommentObjectResponse {}

const Comment: FC<Props> = (comment) => {
  return (
    <li className="flex items-start gap-2.5">
      <img
        src={
          comment.created_by.id === '57cf54e6-95e0-42c1-bf86-d90643349ce3'
            ? '/avatar.svg'
            : '/user.svg'
        }
        alt={
          comment.created_by.id === '57cf54e6-95e0-42c1-bf86-d90643349ce3'
            ? 'avatar'
            : 'user'
        }
        className="h-10 w-10 rounded-full"
      />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">
            {comment.created_by.id === '57cf54e6-95e0-42c1-bf86-d90643349ce3'
              ? 'Kidow'
              : '익명'}
          </span>
          <time
            dateTime={comment.created_time}
            className="text-xs text-slate-400"
          >
            {dayjs(comment.created_time).locale('ko').fromNow()}
          </time>
        </div>
        <div>
          {comment.rich_text.map((item, key) => {
            const className = {
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
            }
            return item.href ? (
              <Link key={key} href={item.href} target="_blank">
                <span className={classnames(className)}>{item.plain_text}</span>
              </Link>
            ) : (
              <span className={classnames(className)} key={key}>
                {item.plain_text}
              </span>
            )
          })}
        </div>
      </div>
    </li>
  )
}

export default Comment
