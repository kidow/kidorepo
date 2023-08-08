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
