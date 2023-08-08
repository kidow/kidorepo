import type { Meta, StoryObj } from '@storybook/react'
import { CountTo } from 'ui'

export default {
  title: 'components/CountTo/v1',
  tags: ['autodocs'],
  component: CountTo.v1,
  argTypes: {}
} satisfies Meta<typeof CountTo.v1>

type Story = StoryObj<typeof CountTo.v1>

export const Default: Story = {}
