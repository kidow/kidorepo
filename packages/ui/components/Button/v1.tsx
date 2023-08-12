'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { cn } from 'utils'

import { Spinner } from '../..'

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  theme?: 'danger' | 'primary' | 'success'
  shape: 'text' | 'contained' | 'outlined'
  icon?: any
  ripple?: boolean
}

function Button({
  loading,
  size,
  theme,
  children,
  disabled,
  className,
  shape,
  icon,
  ripple,
  ...props
}: Props) {
  const Icon = loading ? Spinner.v1 : icon ?? null
  const ref = useRef<HTMLButtonElement>(null)

  const rippleEffect = useCallback((e: MouseEvent) => {
    const element = e.currentTarget as HTMLButtonElement

    const circle = document.createElement('span')
    const diameter = Math.max(element.clientWidth, element.clientHeight)

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.x - element.offsetLeft - diameter / 2}px`
    circle.style.top = `${e.pageY - element.offsetTop - diameter / 2}px`
    circle.classList.add('ripple')

    const ripple = element.getElementsByClassName('ripple')[0]
    if (ripple) ripple.remove()
    element.appendChild(circle)
  }, [])

  useEffect(() => {
    if (!ripple || !ref.current) return
    let refValue: HTMLButtonElement | null = null
    if (ref.current) {
      ref.current.addEventListener('click', rippleEffect)
      refValue = ref.current
    }
    return () => {
      if (refValue) {
        refValue.removeEventListener('click', rippleEffect)
      }
    }
  }, [ripple, rippleEffect])
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        'border font-medium leading-6 transition duration-150 ease-in-out disabled:cursor-not-allowed',
        size === 'xs' ? 'gap-1.5 rounded px-2 py-px text-xs' : 'rounded-md',
        shape === 'outlined'
          ? 'group bg-neutral-100 dark:bg-inherit'
          : 'border-transparent',
        {
          'inline-flex items-center justify-center': loading || icon,
          'hover:brightness-105 active:brightness-90': !loading && !disabled,

          'gap-2 px-3 py-1 text-sm': size === 'sm',
          'gap-3 px-4 py-2 text-base': size === 'md',
          'gap-3 px-5 py-3 text-lg': size === 'lg',

          'bg-neutral-900 text-neutral-100 dark:bg-neutral-800':
            !theme && shape === 'contained',
          'bg-red-600 text-neutral-100':
            theme === 'danger' && shape === 'contained',
          'bg-blue-500 text-neutral-100':
            theme === 'primary' && shape === 'contained',
          'bg-emerald-500 text-neutral-100':
            theme === 'success' && shape === 'contained',
          'disabled:bg-neutral-400 disabled:text-neutral-100':
            shape === 'contained' && (loading || disabled),

          'bg-transparent disabled:hover:bg-neutral-200 disabled:hover:text-neutral-100':
            shape === 'text',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700':
            !theme && shape === 'text',
          'text-red-600 hover:bg-red-100':
            theme === 'danger' && shape === 'text',
          'text-blue-500 hover:bg-blue-100':
            theme === 'primary' && shape === 'text',
          'text-emerald-500 hover:bg-emerald-100':
            theme === 'success' && shape === 'text',

          'hover:text-neutral-100': shape === 'outlined',
          'border-neutral-500 text-neutral-500 hover:bg-neutral-900':
            !theme && shape === 'outlined',
          'border-blue-500 text-blue-500 hover:bg-blue-500':
            theme === 'primary' && shape === 'outlined',
          'border-red-500 text-red-500 hover:bg-red-500':
            theme === 'danger' && shape === 'outlined',
          'border-emerald-500 text-emerald-500 hover:bg-emerald-500':
            theme === 'success' && shape === 'outlined',

          'cursor-progress': loading,
          'relative overflow-hidden': ripple
        },
        className
      )}
      disabled={loading || disabled}
    >
      {Icon && (
        <Icon
          className={cn({
            'h-3 w-3': size === 'xs',
            'h-4 w-4': size === 'sm',
            'h-5 w-5': size === 'md',
            'h-6 w-6': size === 'lg',
            'text-neutral-100': shape === 'contained',
            'group-hover:text-neutral-100': shape === 'outlined',
            'text-neutral-900':
              (shape !== 'contained' && !theme) || shape === 'text',
            'text-blue-500': shape !== 'contained' && theme === 'primary',
            'text-red-500': shape !== 'contained' && theme === 'danger',
            'text-emerald-500': shape !== 'contained' && theme === 'success'
          })}
        />
      )}
      {children}
    </button>
  )
}

export default Button
