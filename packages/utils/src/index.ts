import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import * as EventListener from './event'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export * as EventListener from './event'

export function backdrop(open: boolean) {
  EventListener.emit('backdrop', open)
}

export function hexToRgb(hex: string) {
  hex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r, g, b) => r + r + g + g + b + b
  )

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : null
}

export function rgbToHex(red: number, green: number, blue: number) {
  return (
    '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
  )
}
