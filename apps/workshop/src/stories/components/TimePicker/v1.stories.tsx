import type { Meta, StoryObj } from '@storybook/react'
import { TimePicker } from 'ui'

export default {
  title: 'components/TimePicker/v1',
  tags: ['autodocs'],
  component: TimePicker.v1,
  argTypes: {}
} satisfies Meta<typeof TimePicker.v1>

type Story = StoryObj<typeof TimePicker.v1>

export const Default: Story = {}
