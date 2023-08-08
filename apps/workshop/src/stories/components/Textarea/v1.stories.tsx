import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from 'ui'

export default {
  title: 'components/Textarea/v1',
  tags: ['autodocs'],
  component: Textarea.v1,
  argTypes: {}
} satisfies Meta<typeof Textarea.v1>

type Story = StoryObj<typeof Textarea.v1>

export const Default: Story = {}
