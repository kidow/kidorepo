import type { Meta, StoryObj } from '@storybook/react'
import { MonthPicker } from 'ui'

export default {
  title: 'components/MonthPicker/v1',
  tags: ['autodocs'],
  component: MonthPicker.v1,
  argTypes: {}
} satisfies Meta<typeof MonthPicker.v1>

type Story = StoryObj<typeof MonthPicker.v1>

export const Default: Story = {}
