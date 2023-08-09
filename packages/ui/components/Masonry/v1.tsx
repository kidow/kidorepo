export interface Props extends ReactProps {}

function Masonry({ children }: Props) {
  return (
    <ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
      {children}
    </ul>
  )
}

export default Masonry
