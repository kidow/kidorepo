import type { Meta, StoryObj } from '@storybook/react'
import { Card } from 'ui'

export default {
  title: 'components/Card/v2',
  tags: ['autodocs'],
  component: Card.v2,
  argTypes: {
    title: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Card.v2>

type Story = StoryObj<typeof Card.v2>

export const Default: Story = {
  args: {
    title: 'Title'
  },
  render: (props) => <Card.v2 {...props}>Children</Card.v2>
}
