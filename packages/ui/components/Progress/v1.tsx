export interface Props {
  value: number
}

function Progress({ value }: Props) {
  return (
    <div className="h-3 rounded-full border dark:border-neutral-800">
      <div
        className="animate-progress h-full rounded-full bg-sky-400 bg-[length:30px_30px]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent)',
          width: `${value > 100 ? 100 : value}%`
        }}
      />
    </div>
  )
}

export default Progress
