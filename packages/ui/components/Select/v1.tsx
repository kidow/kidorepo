import type { DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from 'utils'

export interface Props
  extends Omit<
    DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'size'
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  error?: string
}

function Select({ size = 'md', error, children, className, ...props }: Props) {
  return (
    <>
      <div className={cn('relative inline-block', className)}>
        <select
          {...props}
          className={cn(
            'w-full cursor-pointer select-none appearance-none rounded border bg-white pr-8 ring-blue-500 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-200  dark:bg-neutral-800',
            error
              ? 'border-red-500'
              : 'border-neutral-300 dark:border-neutral-700',
            props.value ? 'text-neutral-700' : 'text-neutral-400',
            {
              'py-1 pl-2 text-xs': size === 'xs',
              'py-2 pl-3 text-sm': size === 'sm',
              'py-2 pl-3 text-base': size === 'md',
              'py-2 pl-3 text-lg': size === 'lg'
            }
          )}
        >
          {children}
        </select>
        <ChevronDownIcon
          className={cn(
            'absolute right-2 z-[5] h-5 w-5 text-neutral-400 dark:text-neutral-500',
            {
              'top-1': size === 'xs',
              'top-2': size === 'sm',
              'top-3': size === 'md' || size === 'lg'
            }
          )}
        />
      </div>
      {!!error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </>
  )
}

export default Select
