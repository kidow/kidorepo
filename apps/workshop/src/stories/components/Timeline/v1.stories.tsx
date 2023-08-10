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
  render: () => (
    <ul>
      <Timeline.v1 date="2023-02-03" title="Title 1" content="Content 1" />
      <Timeline.v1 date="2023-02-02" title="Title 2" content="Content 2" />
      <Timeline.v1 date="2023-02-01" title="Title 3" content="Content 3" />
    </ul>
  )
}
