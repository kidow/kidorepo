import { cn } from 'utils'

export interface Props<T> {
  value: T
  onChange: (value: T) => void
  options: Array<{
    name: string
    value: T
    disabled?: boolean
  }>
  direction?: 'horizontal' | 'vertical'
}

function Radio<T>({ value, onChange, options, direction }: Props<T>) {
  return (
    <div
      className={cn('flex flex-wrap gap-2', {
        'flex-col': direction === 'vertical'
      })}
    >
      {options.map((item, key) => (
        <label key={key} className="relative cursor-pointer">
          <input
            type="radio"
            className={cn(
              'cursor-pointer appearance-none before:absolute before:left-0 before:top-[3px] before:rounded-full before:border before:bg-white before:p-2 disabled:cursor-not-allowed dark:before:border-neutral-700 dark:before:bg-neutral-800',
              {
                'before:border-blue-500 after:absolute after:left-1 after:top-[7px] after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue-500':
                  value === item.value
              }
            )}
            checked={value === item.value}
            onChange={() => onChange(item.value)}
            disabled={item.disabled}
          />
          <span
            className={cn(
              'ml-6 select-none',
              item.disabled
                ? 'cursor-not-allowed text-neutral-400 dark:text-neutral-600'
                : 'text-neutral-600 dark:text-neutral-400'
            )}
          >
            {item.name}
          </span>
        </label>
      ))}
    </div>
  )
}

export default Radio
