interface ReactProps {
  children?: ReactNode
}

interface WidgetProps extends ReactProps {
  icon: ReactNode
  title: string
  size?: Argument
  description?: string
  button?: ReactNode
  className?: Argument
}

interface Track {
  track: {
    album: {
      images: Array<{ url: string }>
    }
    artists: Array<{
      name: string
    }>
    name: string
    preview_url: string
    duration_ms: number
  }
}
