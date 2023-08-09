'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useOnClickOutside } from 'hooks'
import { ChevronDownIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn, hexToRgb, rgbToHex } from 'utils'

import Hue from './v1/Hue'
import RGB from './v1/RGB'
import Spectrum from './v1/Spectrum'

export interface Props {
  value: string
  onChange: (hex: string) => void
}

function ColorPicker({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [red, setRed] = useState(hexToRgb(value)?.red || 0)
  const [green, setGreen] = useState(hexToRgb(value)?.green || 0)
  const [blue, setBlue] = useState(hexToRgb(value)?.blue || 0)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const spectrumRef = useRef<HTMLCanvasElement>(null)
  const hueRef = useRef<HTMLCanvasElement>(null)
  const id = useId()
  const onSyncSpectrumHue = (red: number, green: number, blue: number) => {
    const spectrumContext = spectrumRef.current
      ? spectrumRef.current.getContext('2d')
      : null
    const hueContext = hueRef.current ? hueRef.current.getContext('2d') : null

    if (spectrumContext && hueContext) {
      spectrumContext.rect(0, 0, 176, 176)
      spectrumContext.fillStyle = `rgb(${red}, ${green}, ${blue})`
      spectrumContext.fillRect(0, 0, 176, 176)

      const white = hueContext.createLinearGradient(0, 0, 176, 0)
      white.addColorStop(0, 'rgba(255, 255, 255, 1)')
      white.addColorStop(1, 'rgba(255, 255, 255, 0)')
      spectrumContext.fillStyle = white
      spectrumContext.fillRect(0, 0, 176, 176)

      const black = hueContext.createLinearGradient(0, 0, 0, 176)
      black.addColorStop(0, 'rgba(0, 0, 0, 0)')
      black.addColorStop(1, 'rgba(0 ,0, 0, 1)')
      spectrumContext.fillStyle = black
      spectrumContext.fillRect(0, 0, 176, 176)
    }
  }

  const COLOR_TYPES: Array<{ hex: string; className: string }> = useMemo(
    () => [
      { hex: '#ef4444', className: 'bg-red-500' },
      { hex: '#f97316', className: 'bg-orange-500' },
      { hex: '#eab308', className: 'bg-yellow-500' },
      { hex: '#22c55e', className: 'bg-green-500' },
      { hex: '#3b82f6', className: 'bg-blue-500' },
      { hex: '#6366f1', className: 'bg-indigo-500' },
      { hex: '#6b7280', className: 'bg-gray-500' },
      { hex: '#1f2937', className: 'bg-gray-800' }
    ],
    []
  )

  useEffect(() => {
    if (isOpen) onSyncSpectrumHue(red, green, blue)
  }, [isOpen, red, green, blue])

  useOnClickOutside(targetRef, () => setIsOpen(false), id)
  return (
    <>
      <button
        id={id}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="h-6 w-6" style={{ backgroundColor: value }} />
        <div className="w-16 text-sm font-semibold text-neutral-700 dark:text-neutral-50">
          {value}
        </div>
        <ChevronDownIcon
          className={cn('h-4 w-4 text-neutral-400 duration-150', {
            'rotate-180': isOpen
          })}
        />
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={targetRef}
            className="color-picker fixed z-[9999] w-56 rounded border bg-white p-2.5 shadow-xl dark:bg-slate-200"
            style={{
              top:
                buttonRef.current!.getBoundingClientRect().top +
                buttonRef.current!.clientHeight,
              left: buttonRef.current!.getBoundingClientRect().left
            }}
          >
            <div className="space-y-2">
              <div className="flex gap-2">
                <Spectrum
                  ref={spectrumRef}
                  onChange={(red, green, blue) => {
                    setRed(red)
                    setGreen(green)
                    setBlue(blue)
                    onChange(rgbToHex(red, green, blue))
                  }}
                />
                <Hue
                  ref={hueRef}
                  onChange={(red, green, blue) => {
                    setRed(red)
                    setGreen(green)
                    setBlue(blue)
                    onChange(rgbToHex(red, green, blue))
                    onSyncSpectrumHue(red, green, blue)
                  }}
                />
              </div>
              <div className="h-7.5 flex text-xs">
                <span className="w-15 flex select-none items-center justify-center bg-neutral-100 text-neutral-400">
                  HEX
                </span>
                <input
                  className="w-full flex-1 bg-neutral-50 px-3 text-neutral-600"
                  spellCheck={false}
                  value={value}
                  name="hex"
                  onChange={(e) => {
                    if (e.target.value.length > 7) return
                    onChange(e.target.value)
                  }}
                />
              </div>
              <div className="h-7.5 flex text-xs">
                <span className="w-15 flex select-none items-center justify-center bg-neutral-100 text-neutral-400">
                  RGB
                </span>
                <div className="flex flex-1 gap-1 bg-neutral-50 px-3">
                  <RGB
                    value={red}
                    onChange={(red) => {
                      setRed(red)
                      onChange(rgbToHex(red, green, blue))
                      onSyncSpectrumHue(red, green, blue)
                    }}
                  />
                  <RGB
                    value={green}
                    onChange={(green) => {
                      setGreen(green)
                      onChange(rgbToHex(red, green, blue))
                      onSyncSpectrumHue(red, green, blue)
                    }}
                  />
                  <RGB
                    value={blue}
                    onChange={(blue) => {
                      setBlue(blue)
                      onChange(rgbToHex(red, green, blue))
                      onSyncSpectrumHue(red, green, blue)
                    }}
                  />
                </div>
              </div>
              <ul className="flex gap-2.5">
                {COLOR_TYPES.map((item, key) => (
                  <li
                    onClick={() => {
                      onChange(item.hex)
                      const rgb = hexToRgb(item.hex)
                      if (rgb) {
                        setRed(rgb.red)
                        setGreen(rgb.green)
                        setBlue(rgb.blue)
                        onSyncSpectrumHue(rgb.red, rgb.green, rgb.blue)
                      }
                    }}
                    className={cn(
                      'h-4 w-4 cursor-pointer rounded duration-150 hover:scale-125',
                      item.className
                    )}
                    key={key}
                  />
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default ColorPicker
