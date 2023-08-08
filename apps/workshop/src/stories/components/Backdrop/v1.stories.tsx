import type { Meta, StoryObj } from '@storybook/react'
import { Backdrop } from 'ui'

export default {
  title: 'components/Backdrop/v1',
  tags: ['autodocs'],
  component: Backdrop.v1,
  argTypes: {}
} satisfies Meta<typeof Backdrop.v1>

type Story = StoryObj<typeof Backdrop.v1>

export const Default: Story = {}
