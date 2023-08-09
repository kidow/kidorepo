import type { Meta, StoryObj } from '@storybook/react'
import { MonthPicker } from 'ui'

export default {
  title: 'components/MonthPicker/v1',
  tags: ['autodocs'],
  component: MonthPicker.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    }
  }
} satisfies Meta<typeof MonthPicker.v1>

type Story = StoryObj<typeof MonthPicker.v1>

export const Default: Story = {
  args: {
    value: '2023.08',
    onChange: (value) => console.log(value)
  }
}
