import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from 'ui'
import { EventListener } from 'utils'

export default {
  title: 'components/Drawer/v1',
  tags: ['autodocs'],
  component: Drawer.v1,
  argTypes: {
    position: {
      type: {
        name: 'enum',
        value: ['top', 'right', 'bottom', 'left']
      }
    }
  }
} satisfies Meta<typeof Drawer.v1>

type Story = StoryObj<typeof Drawer.v1>

export const Default: Story = {
  args: {
    position: 'top'
  },
  render: (props) => (
    <>
      <button onClick={() => EventListener.emit('drawer', true)}>Open</button>
      <Drawer.v1 {...props} />
    </>
  )
}
