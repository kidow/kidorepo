import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from 'ui'

export default {
  title: 'components/Modal/v1',
  tags: ['autodocs'],
  component: Modal.v1,
  argTypes: {
    isOpen: {
      type: 'boolean'
    },
    onClose: {
      type: 'function'
    },
    children: {
      type: 'symbol'
    },
    maxWidth: {
      type: {
        name: 'enum',
        value: [
          'max-w-screen-2xl',
          'max-w-screen-xl',
          'max-w-screen-lg',
          'max-w-screen-md',
          'max-w-screen-sm',
          'max-w-full',
          'max-w-8xl',
          'max-w-7xl',
          'max-w-6xl',
          'max-w-5xl',
          'max-w-4xl',
          'max-w-3xl',
          'max-w-2xl',
          'max-w-xl',
          'max-w-lg',
          'max-w-md',
          'max-w-sm',
          'max-w-xs'
        ]
      }
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    padding: {
      type: 'boolean'
    },
    footer: {
      type: 'symbol'
    }
  }
} satisfies Meta<typeof Modal.v1>

type Story = StoryObj<typeof Modal.v1>

function Example() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className="flex h-40 items-center justify-center">
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>
      <Modal.v1
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="TITLE"
        description="DESCRIPTION"
        footer="FOOTER"
      />
    </>
  )
}

export const Default: Story = {
  render: () => <Example />
}
