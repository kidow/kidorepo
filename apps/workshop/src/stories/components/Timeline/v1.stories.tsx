import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from 'ui'

export default {
  title: 'components/Timeline/v1',
  tags: ['autodocs'],
  component: Timeline.v1,
  argTypes: {
    date: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Timeline.v1>

type Story = StoryObj<typeof Timeline.v1>

export const Default: Story = {
  args: {
    date: '2023-08-13',
    title: 'Title',
    content: 'Content'
  },
  render: (props) => (
    <ul>
      <Timeline.v1 {...props} />
      <Timeline.v1 {...props} />
      <Timeline.v1 {...props} />
    </ul>
  )
}
