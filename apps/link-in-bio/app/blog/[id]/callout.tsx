import type { FC } from 'react'
import Link from 'next/link'
import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getRichTextClassName } from './utils'

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
      </div>
    </div>
  )
}

export default Callout
