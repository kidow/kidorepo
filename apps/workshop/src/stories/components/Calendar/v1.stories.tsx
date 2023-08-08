import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from 'ui'

export default {
  title: 'components/Calendar/v1',
  tags: ['autodocs'],
  component: Calendar.v1,
  argTypes: {}
} satisfies Meta<typeof Calendar.v1>

type Story = StoryObj<typeof Calendar.v1>

export const Default: Story = {}
