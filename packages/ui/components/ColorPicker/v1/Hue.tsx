'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useCombinedRefs } from 'hooks'

export interface Props {
  onChange: (red: number, green: number, blue: number) => void
}

const Hue = forwardRef<HTMLCanvasElement, Props>(({ onChange }, ref) => {
  const [y, setY] = useState<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  canvasRef.current
  const combinedRef = useCombinedRefs<HTMLCanvasElement>(ref, canvasRef)

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setY(e.offsetY - 2)
      const imageData = combinedRef.current
        ?.getContext('2d')
        ?.getImageData(0, e.offsetY - 2, 1, 1).data
      const red = imageData?.at(0) || 0
      const green = imageData?.at(1) || 0
      const blue = imageData?.at(2) || 0
      onChange(red, green, blue)
    },
    [combinedRef, onChange]
  )

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      setY(e.offsetY - 2)
      const imageData = combinedRef.current
        ?.getContext('2d')
        ?.getImageData(0, e.offsetY - 2, 1, 1).data
      const red = imageData?.at(0) || 0
      const green = imageData?.at(1) || 0
      const blue = imageData?.at(2) || 0
      onChange(red, green, blue)
      combinedRef.current?.addEventListener('mousemove', onMouseMove)
    },
    [combinedRef, onChange, onMouseMove]
  )

  const onMouseUp = useCallback(
    () => combinedRef.current?.removeEventListener('mousemove', onMouseMove),
    [combinedRef, onMouseMove]
  )

  const onMouseLeave = useCallback(
    () => combinedRef.current?.removeEventListener('mousemove', onMouseMove),
    [combinedRef, onMouseMove]
  )

  useEffect(() => {
    const ctx = combinedRef.current
      ? combinedRef.current.getContext('2d')
      : null

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 16, 176)
      for (let i = 0; i <= 360; i += 30) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 176)
    }
    let refValue: HTMLCanvasElement | null = null
    if (combinedRef.current) {
      combinedRef.current.addEventListener('mousedown', onMouseDown, false)
      combinedRef.current.addEventListener('mouseup', onMouseUp, false)
      combinedRef.current.addEventListener('mouseleave', onMouseLeave, false)
      refValue = combinedRef.current
    }

    return () => {
      if (refValue) {
        refValue.removeEventListener('mousedown', onMouseDown)
        refValue.removeEventListener('mouseup', onMouseUp)
        refValue.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [combinedRef, onMouseDown, onMouseLeave, onMouseUp])
  return (
    <div className="relative w-4 cursor-pointer">
      <canvas width={16} height={176} ref={combinedRef} />
      <div
        style={{ top: y }}
        className="pointer-events-none absolute left-0 h-1 w-full bg-white"
      />
    </div>
  )
})

export default Hue
