export interface Props extends ReactProps {}

function Badge({ children }: Props) {
  return (
    <span className="relative inline-block">
      {children}
      <span className="absolute right-0 top-0 -mr-1 -mt-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
      </span>
    </span>
  )
}

export default Badge
