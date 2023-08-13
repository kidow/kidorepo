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

export function twoDigitsNumber(digit: number): string {
  return digit < 10 ? `0${digit}` : String(digit)
}

class Toast {
  private emit(message: string, type: NToast.Type) {
    EventListener.emit<NToast.Emit>('toast', { message, type })
  }
  success(message: string) {
    this.emit(message, 'success')
  }
  info(message: string) {
    this.emit(message, 'info')
  }
  warn(message: string) {
    this.emit(message, 'warn')
  }
  error(message: string) {
    this.emit(message, 'error')
  }
}

export const toast = new Toast()

export function copyText(text: string): Promise<string> | undefined {
  if (
    typeof window === 'undefined' ||
    typeof window.navigator === 'undefined'
  ) {
    alert('호환되지 않는 브라우저입니다.')
    return
  }

  return new Promise((resolve, reject) =>
    window.navigator.clipboard
      .writeText(text)
      .then(() => resolve(text))
      .catch(reject)
  )
}

export function enumToOptions(enumObj: any) {
  return Object.entries<string>(enumObj).map(([value, name]) => ({
    value,
    name
  }))
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (err) => reject(err)
  })
}

export function getBrightness(red: number, green: number, blue: number) {
  return (red * 299 + green * 587 + blue * 114) / 1000
}

export function isDark(red: number, green: number, blue: number) {
  return getBrightness(red, green, blue) < 128
}

export function isLight(red: number, green: number, blue: number) {
  return getBrightness(red, green, blue) >= 128
}

export function priceFormat(price: number) {
  return Intl.NumberFormat('us').format(price).toString()
}

export function randomString() {
  return Math.random().toString(36).slice(2)
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
