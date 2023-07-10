interface ReactProps {
  children?: ReactNode
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface NavItem {
  title: string
  items: NavItem[]
  href?: string
  external?: boolean
}
