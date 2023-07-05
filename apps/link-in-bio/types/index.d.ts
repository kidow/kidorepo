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
