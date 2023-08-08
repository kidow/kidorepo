import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from 'ui'

export default {
  title: 'components/Popover/v1',
  tags: ['autodocs'],
  component: Popover.v1,
  argTypes: {}
} satisfies Meta<typeof Popover.v1>

type Story = StoryObj<typeof Popover.v1>

export const Default: Story = {}
