import { cn } from 'utils'

export interface Props<T> {
  value: T
  onChange: (value: T) => void
  options: Array<{
    name: string
    description?: string
    value: T
    disabled?: boolean
  }>
  direction?: 'horizontal' | 'vertical'
}

function Radio<T>({
  value,
  onChange,
  options,
  direction = 'horizontal'
}: Props<T>) {
  return (
    <div
      className={cn('flex flex-wrap gap-2', {
        'flex-col': direction === 'vertical'
      })}
    >
      {options.map((item, key) => (
        <label
          key={key}
          className={cn(
            'relative flex cursor-pointer gap-8 rounded border pb-2 pl-1 pr-4 pt-1.5',
            value === item.value
              ? 'border-blue-500'
              : 'dark:border-neutral-700',
            item.disabled
              ? 'cursor-not-allowed'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'
          )}
        >
          <input
            type="radio"
            className={cn(
              'cursor-pointer appearance-none before:absolute before:left-2 before:top-2 before:rounded-full before:border before:bg-white before:p-2 disabled:cursor-not-allowed dark:before:border-neutral-700 dark:before:bg-neutral-800',
              {
                'before:border-blue-500 after:absolute after:left-3 after:top-3 after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue-500':
                  value === item.value
              }
            )}
            checked={value === item.value}
            onChange={() => onChange(item.value)}
            disabled={item.disabled}
          />
          <div className="mt-px space-y-2 break-all">
            <div className="text-sm text-neutral-800 dark:text-neutral-300">
              {item.name}
            </div>
            <div className="text-xs text-neutral-400">{item.description}</div>
          </div>
        </label>
      ))}
    </div>
  )
}

export default Radio
