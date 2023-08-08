import { cn } from 'utils'

export interface Props extends ReactProps {
  title?: string
  caption?: string
  footer?: string
  border?: boolean
  padding?: boolean
  className?: string
}

function Card({
  title,
  caption,
  footer,
  border,
  padding,
  className,
  children
}: Props) {
  return (
    <section
      className={cn('bg-white shadow-md dark:bg-neutral-800', {
        'border dark:border-neutral-700': border
      })}
    >
      {!!title && (
        <div className="flex items-center justify-between p-6">
          <div className="font-bold">{title}</div>
          {!!caption && (
            <div className="text-xs dark:text-neutral-400">{caption}</div>
          )}
        </div>
      )}
      {!!children && (
        <div
          className={cn(
            'relative dark:border-neutral-700',
            footer ? 'border-y' : 'border-t',
            { 'px-6 py-10': padding },
            className
          )}
        >
          {children}
        </div>
      )}
      {!!footer && <div className="px-6 py-4">{footer}</div>}
    </section>
  )
}

export default Card
