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
