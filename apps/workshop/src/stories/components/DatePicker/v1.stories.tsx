import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from 'ui'

export default {
  title: 'components/DatePicker/v1',
  tags: ['autodocs'],
  component: DatePicker.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    },
    format: {
      type: 'string',
      defaultValue: 'YYYY.MM.DD'
    }
  }
} satisfies Meta<typeof DatePicker.v1>

type Story = StoryObj<typeof DatePicker.v1>

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log(value),
    format: 'YYYY.MM.DD'
  }
}
