'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'utils'

export interface Props extends ReactProps, VariantProps<typeof variants> {
  content: string
  className?: string
}

const variants = cva(
  'relative inline-block text-center before:pointer-events-none before:absolute before:z-[9999] before:w-max before:max-w-xs before:rounded before:bg-neutral-800 before:px-2 before:py-1 before:text-xs before:text-neutral-50 before:opacity-0 before:delay-100 before:duration-200 before:ease-in-out before:content-[attr(data-tip)] hover:before:opacity-100 hover:before:delay-75 dark:before:bg-neutral-700',
  {
    variants: {
      position: {
        top: 'before:bottom-[calc(100%+4px)] before:top-auto before:left-1/2 before:-translate-x-1/2',
        right:
          'before:left-[calc(100%+5px)] before:top-1/2 before:-translate-y-1/2',
        bottom:
          'before:top-[calc(100%+4px)] before:left-1/2 before:-translate-x-1/2',
        left: 'before:left-auto before:right-[calc(100%+5px)] before:top-1/2 before:-translate-y-1/2'
      },
      arrow: {
        true: 'after:absolute after:z-[9999] after:block after:h-0 after:w-0 after:border-[3px] after:border-transparent after:opacity-0 after:delay-100 after:duration-200 after:ease-in-out after:content-[""] hover:after:opacity-100 hover:after:delay-75'
      }
    },
    compoundVariants: [
      {
        position: ['top', 'right', 'bottom'],
        className: 'before:right-auto'
      },
      {
        position: 'top',
        arrow: true,
        className:
          'after:bottom-[calc(100%-2px)] after:top-auto after:border-t-neutral-800 dark:after:border-t-neutral-700 after:left-1/2 after:-translate-x-1/2 after:right-auto'
      },
      {
        position: 'right',
        arrow: true,
        className:
          'after:left-[calc(100%-1px)] after:border-r-neutral-800 dark:after:border-r-neutral-700 after:right-auto after:top-1/2 after:-translate-y-1/2 after:bottom-auto'
      },
      {
        position: 'bottom',
        arrow: true,
        className:
          'after:top-[calc(100%-2px)] after:border-b-neutral-800 dark:after:border-b-neutral-700 after:left-1/2 after:-translate-x-1/2 after:right-auto after:bottom-auto'
      },
      {
        position: 'left',
        arrow: true,
        className:
          'after:left-auto after:right-[calc(100%-1px)] after:border-l-neutral-800 dark:after:border-l-neutral-700 after:top-1/2 after:-translate-y-1/2 after:bottom-auto'
      }
    ],
    defaultVariants: {
      position: 'top',
      arrow: true
    }
  }
)

function Tooltip({
  children,
  content,
  position = 'top',
  arrow = true,
  className
}: Props) {
  return (
    <div
      className={cn(variants({ position, arrow, className }))}
      data-tip={content}
      role="tooltip"
    >
      {children}
    </div>
  )
}

export default Tooltip
