import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from 'ui'

export default {
  title: 'components/DatePicker/v1',
  tags: ['autodocs'],
  component: DatePicker.v1,
  argTypes: {}
} satisfies Meta<typeof DatePicker.v1>

type Story = StoryObj<typeof DatePicker.v1>

export const Default: Story = {}
