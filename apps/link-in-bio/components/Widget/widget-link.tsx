'use client'

import Link from 'next/link'
import classnames from 'classnames'

interface Props extends WidgetProps {
  href: string
}

function WidgetLink({
  href,
  icon,
  title,
  button,
  children,
  className,
  description,
  size
}: Props) {
  return (
    <li className={classnames('duration-150', className)}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        draggable={false}
        className={classnames(
          'flex rounded-3xl border border-neutral-200 p-5 shadow-sm duration-150 hover:bg-neutral-50 xl:p-6',
          size
        )}
      >
        <div className="flex flex-col items-start">
          {icon}
          <div className="mt-3 flex-1">
            <div className="text-sm">{title}</div>
            {!!description && (
              <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
                {description}
              </p>
            )}
          </div>
          {button}
        </div>
        <div className="ml-6 flex-1">{children}</div>
      </Link>
    </li>
  )
}

export default WidgetLink
