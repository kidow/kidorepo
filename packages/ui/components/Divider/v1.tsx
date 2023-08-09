import { cn } from 'utils'

export interface Props {
  title?: string
}

function Divider({ title }: Props) {
  return (
    <div className={cn({ relative: !!title })}>
      <hr className={cn({ 'my-8': !!title })} />
      {!!title && (
        <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
          {title}
        </p>
      )}
    </div>
  )
}

export default Divider
