import type { FC } from 'react'
import Link from 'next/link'
import { getRichTextClassName } from '@/utils'
import type { CommentObjectResponse } from '@notionhq/client/build/src/api-endpoints'
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
            const className = getRichTextClassName(item)
            return item.href ? (
              <Link key={key} href={item.href} target="_blank">
                <span className={className}>{item.plain_text}</span>
              </Link>
            ) : (
              <span className={className} key={key}>
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
