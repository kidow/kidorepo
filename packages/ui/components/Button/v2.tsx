import { memo } from 'react'
import { cn } from 'utils'

import { Spinner } from '../..'

export interface Props {
  text: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
  theme?: 'primary'
  className?: string
  loading?: boolean
  disabled?: boolean
}

function Button({
  text,
  onClick,
  theme,
  className,
  disabled,
  loading,
  type
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'rounded-md border border-transparent px-3.5 py-2 font-medium duration-150 focus:outline-none active:border-neutral-500 active:ring disabled:cursor-not-allowed disabled:bg-neutral-600',
        {
          'bg-neutral-800 hover:bg-neutral-50 hover:text-neutral-900 active:ring-neutral-50':
            !theme,
          'bg-primary active:ring-primary text-neutral-900':
            theme === 'primary',
          'inline-flex items-center gap-3': loading
        },
        className
      )}
      disabled={disabled || loading}
    >
      {loading && <Spinner.v1 className="h-5 w-5" />}
      {text}
    </button>
  )
}

export default memo(Button)
