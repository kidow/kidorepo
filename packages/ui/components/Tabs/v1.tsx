import { cn } from 'utils'

export interface Props {
  list: string[]
  value: number
  onChange: (tab: number) => void
  size?: 'xs' | 'sm' | 'md'
}

function Tabs({ list, value, onChange, size = 'md' }: Props) {
  return (
    <div className="relative border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex gap-8">
        {list.map((item, key) => (
          <div
            key={key}
            className={cn(
              'cursor-pointer font-medium transition duration-150 ease-in-out',
              value === key ? 'text-primary' : 'text-neutral-600',
              {
                'border-primary border-b-2': value === key,
                'py-6': size === 'md',
                'py-3 text-sm': size === 'sm',
                'py-1 text-xs': size === 'xs'
              }
            )}
            onClick={() => onChange(key)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
