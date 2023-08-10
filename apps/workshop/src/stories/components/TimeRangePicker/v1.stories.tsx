import type { Meta, StoryObj } from '@storybook/react'
import { TimeRangePicker } from 'ui'

export default {
  title: 'components/TimeRangePicker/v1',
  tags: ['autodocs'],
  component: TimeRangePicker.v1,
  argTypes: {
    startTime: {
      type: 'string'
    },
    endTime: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    },
    error: {
      type: 'string'
    }
  }
} satisfies Meta<typeof TimeRangePicker.v1>

type Story = StoryObj<typeof TimeRangePicker.v1>

export const Default: Story = {
  args: {
    startTime: '',
    endTime: ''
  }
}
