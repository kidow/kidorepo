import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from 'ui'

export default {
  title: 'components/Dialog/v1',
  tags: ['autodocs'],
  component: Dialog.v1,
  argTypes: {
    title: {
      type: 'string'
    },
    onClose: {
      type: 'function'
    },
    description: {
      type: 'string'
    },
    padding: {
      type: 'boolean'
    },
    footer: {
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
    }
  }
} satisfies Meta<typeof Dialog.v1>

type Story = StoryObj<typeof Dialog.v1>

const DefaultExample = () => {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <div className="flex h-40 items-center justify-center">
        <button onClick={() => ref.current?.showModal()}>Open</button>
      </div>
      <Dialog.v1
        ref={ref}
        title="Dialog"
        description="description"
        padding
        footer={<div>Footer</div>}
        maxWidth="max-w-lg"
        onClose={() => ref.current?.close()}
      >
        children
      </Dialog.v1>
    </>
  )
}

export const Default: Story = {
  args: {
    title: 'TITLE',
    description: 'DESCRIPTION',
    padding: true,
    footer: 'FOOTER',
    maxWidth: 'max-w-lg'
  },
  render: () => <DefaultExample />
}
