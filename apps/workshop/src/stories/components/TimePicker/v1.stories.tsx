import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { TimePicker } from 'ui'

export default {
  title: 'components/TimePicker/v1',
  tags: ['autodocs'],
  component: TimePicker.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    }
  }
} satisfies Meta<typeof TimePicker.v1>

type Story = StoryObj<typeof TimePicker.v1>

export const Default: Story = {
  args: {
    value: dayjs()
  }
}
