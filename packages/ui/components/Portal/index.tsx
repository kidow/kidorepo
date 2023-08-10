import { createPortal } from 'react-dom'

export interface Props extends ReactProps {}

function Portal({ children }: Props) {
  if (!children) return <></>
  return createPortal(children, document.body)
}

export default Portal
