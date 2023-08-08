import type { Meta, StoryObj } from '@storybook/react'
import { BellIcon } from 'lucide-react'
import { Badge } from 'ui'

export default {
  title: 'components/Badge/v1',
  tags: ['autodocs'],
  component: Badge.v1
} satisfies Meta<typeof Badge.v1>

type Story = StoryObj<typeof Badge.v1>

export const Default: Story = {
  render: () => (
    <Badge.v1>
      <BellIcon />
    </Badge.v1>
  )
}
