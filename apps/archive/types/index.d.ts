interface ReactProps {
  children?: ReactNode
}

interface Item {
  title: string
  url: string
  items?: Item[]
}
