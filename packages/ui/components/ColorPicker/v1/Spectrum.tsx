'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useCombinedRefs } from 'hooks'

export interface Props {
  onChange: (red: number, green: number, blue: number) => void
}

const Spectrum = forwardRef<HTMLCanvasElement, Props>(({ onChange }, ref) => {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  canvasRef.current
  const combinedRef = useCombinedRefs<HTMLCanvasElement>(ref, canvasRef)

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setX(e.offsetX - 6)
      setY(e.offsetY - 6)
      const imageData = combinedRef.current
        ?.getContext('2d')
        ?.getImageData(e.offsetX - 6, e.offsetY - 6, 1, 1).data
      onChange(
        imageData?.at(0) || 0,
        imageData?.at(1) || 0,
        imageData?.at(2) || 0
      )
    },
    [combinedRef, onChange]
  )

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      setX(e.offsetX - 6)
      setY(e.offsetY - 6)
      const imageData = combinedRef.current
        ?.getContext('2d')
        ?.getImageData(e.offsetX - 6, e.offsetY - 6, 1, 1).data
      onChange(
        imageData?.at(0) || 0,
        imageData?.at(1) || 0,
        imageData?.at(2) || 0
      )
      combinedRef.current?.addEventListener('mousemove', onMouseMove)
    },
    [combinedRef, onMouseMove, onChange]
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
    <div className="relative cursor-pointer">
      <canvas width={176} height={176} ref={combinedRef} />
      <div
        style={{ left: x, top: y }}
        className="pointer-events-none absolute h-3 w-3 rounded-full border border-white"
      />
    </div>
  )
})

export default Spectrum
