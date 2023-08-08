import type { Meta, StoryObj } from '@storybook/react'
import { DatetimePicker } from 'ui'

export default {
  title: 'components/DatetimePicker/v1',
  tags: ['autodocs'],
  component: DatetimePicker.v1,
  argTypes: {}
} satisfies Meta<typeof DatetimePicker.v1>

type Story = StoryObj<typeof DatetimePicker.v1>

export const Default: Story = {}
