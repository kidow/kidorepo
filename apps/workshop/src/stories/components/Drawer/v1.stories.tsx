import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from 'ui'

export default {
  title: 'components/Drawer/v1',
  tags: ['autodocs'],
  component: Drawer.v1,
  argTypes: {
    isOpen: {
      type: 'boolean'
    },
    onClose: {
      type: 'function'
    },
    position: {
      type: {
        name: 'enum',
        value: ['top', 'right', 'bottom', 'left']
      }
    }
  }
} satisfies Meta<typeof Drawer.v1>

type Story = StoryObj<typeof Drawer.v1>

function Example(props: {
  isOpen: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
}) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Drawer.v1
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={props.position || 'left'}
      >
        <div>Drawer</div>
      </Drawer.v1>
    </>
  )
}

export const Default: Story = {
  args: {
    position: 'left'
  },
  render: (props) => <Example isOpen={props.isOpen} position={props.position} />
}
