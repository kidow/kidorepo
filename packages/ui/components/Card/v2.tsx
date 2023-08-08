export interface Props extends ReactProps {
  title: string
}

function Card({ title, children }: Props) {
  return (
    <div className="relative rounded border border-neutral-200 px-6 py-7">
      <div className="absolute -top-3 left-4 bg-white px-2 text-lg font-medium">
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Card
