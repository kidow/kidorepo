import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from 'ui'

export default {
  title: 'components/Toast/v1',
  tags: ['autodocs'],
  component: Toast.v1,
  argTypes: {}
} satisfies Meta<typeof Toast.v1>

type Story = StoryObj<typeof Toast.v1>

export const Default: Story = {}
