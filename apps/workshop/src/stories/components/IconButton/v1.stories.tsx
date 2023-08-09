import type { Meta, StoryObj } from '@storybook/react'
import { BellIcon } from 'lucide-react'
import { IconButton } from 'ui'

export default {
  title: 'components/IconButton/v1',
  tags: ['autodocs'],
  component: IconButton.v1,
  argTypes: {
    className: {
      type: 'string'
    },
    onClick: {
      type: 'function'
    }
  }
} satisfies Meta<typeof IconButton.v1>

type Story = StoryObj<typeof IconButton.v1>

export const Default: Story = {
  render: () => (
    <IconButton.v1>
      <BellIcon />
    </IconButton.v1>
  )
}
