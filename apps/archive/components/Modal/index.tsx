'use client'

import { createPortal } from 'react-dom'

interface Props extends ReactProps, ModalProps {}

function Modal({ isOpen, onClose }: Props) {
  if (!isOpen) return null
  return createPortal(<div></div>, document.body)
}

export default Modal
