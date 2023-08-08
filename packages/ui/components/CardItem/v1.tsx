import { cn } from 'utils'

export interface Props extends ReactProps {
  label: string
  required?: boolean
  fullWidth?: boolean
  plain?: boolean
}

function CardItem({ children, label, required, fullWidth, plain }: Props) {
  return (
    <div className="flex gap-10">
      <div
        className={cn('min-w-[9rem] text-neutral-400', {
          "whitespace-nowrap after:text-red-500 after:content-['*']": required
        })}
      >
        <div className="inline-flex h-[42px] items-center gap-0.5">{label}</div>
      </div>
      <div className={cn({ 'flex-1': fullWidth, 'mt-2.5': plain })}>
        {children}
      </div>
    </div>
  )
}

export default CardItem
