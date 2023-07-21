import type { FC } from 'react'
import Link from 'next/link'
import type { ToggleBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'
import { TriangleIcon } from 'lucide-react'

import { getRichTextClassName } from './utils'

export interface Props extends ToggleBlockObjectResponse, ReactProps {}

const Toggle: FC<Props> = ({ toggle, has_children, children }) => {
  return (
    <button className="group block text-left focus:outline-none">
      <div className="inline-flex items-center gap-2">
        <TriangleIcon
          size={16}
          className="rotate-90 duration-150 group-focus:rotate-180"
        />
        <div>
          {toggle.rich_text.map((item, key) => {
            const className = classnames(getRichTextClassName(item), {
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
      {children}
    </button>
  )
}

export default Toggle
