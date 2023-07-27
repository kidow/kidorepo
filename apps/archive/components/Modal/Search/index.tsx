'use client'

import Modal from '..'

interface Props extends ModalProps {}

function SearchModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      das
    </Modal>
  )
}

export default SearchModal
