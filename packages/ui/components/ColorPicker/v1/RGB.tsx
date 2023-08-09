'use client'
export interface Props {
  value: number
  onChange: (value: number) => void
}

function RGB({ value, onChange }: Props) {
  return (
    <input
      className="w-6 bg-slate-50 text-right text-slate-600 focus:outline-none"
      value={value}
      type="number"
      onChange={(e) => {
        if (Number(e.target.value) < 0 || Number(e.target.value) > 255) return
        onChange(Number(e.target.value))
      }}
    />
  )
}

export default RGB
