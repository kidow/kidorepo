'use client'

import { useId } from 'react'
import type {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  KeyboardEvent,
  ReactNode
} from 'react'
import { cn } from 'utils'

export interface Props {
  suffix?: ReactNode
  required?: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
  fullWidth?: boolean
  float?: boolean
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onEnter?: () => void
}

const Input: FC<Props> = ({
  required,
  type = 'text',
  suffix,
  placeholder,
  fullWidth,
  float = true,
  className,
  value,
  onChange,
  onEnter
}) => {
  const id = useId()
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!onEnter) onEnter()
  }
  return (
    <div className={cn('inline-block', { 'w-full': fullWidth }, className)}>
      <div
        className={cn(
          'ring-primary focus:border-primary rounded border border-neutral-200 px-3 py-2 duration-150 focus-within:ring',
          { 'w-full': fullWidth, relative: !!placeholder }
        )}
      >
        <input
          className={cn('w-full bg-transparent focus:outline-none', {
            'peer placeholder:text-transparent': !!placeholder && float
          })}
          id={id}
          type={type}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={value}
          required={required}
          autoComplete="off"
          placeholder={placeholder}
          spellCheck={false}
        />
        <label className="absolute -top-6 left-0 max-w-[calc(100%-24px)] cursor-text select-none truncate text-sm text-slate-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:max-w-full peer-focus:cursor-default peer-focus:text-sm peer-focus:text-slate-400">
          {placeholder}
        </label>
        {suffix}
      </div>
    </div>
  )
}

export default Input
