interface ReactProps {
  children?: ReactNode
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /**
   * @default "max-w-lg"
   */
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
  description?: ReactNode
  padding?: boolean
  footer?: ReactNode
}

namespace NToast {
  type Type = 'success' | 'info' | 'warn' | 'error'
  interface Emit {
    message: string
    type: NToast.Type
  }
  interface Item {
    id: string
    message: string
    type: NToast.Type
  }
}

interface LinkItem {
  title: string
  items: Array<{
    title: string
    slug: string
  }>
}
