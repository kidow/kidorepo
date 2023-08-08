import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'ui'

export default {
  title: 'components/Avatar/v1',
  tags: ['autodocs'],
  component: Avatar.v1,
  argTypes: {}
} satisfies Meta<typeof Avatar.v1>

type Story = StoryObj<typeof Avatar.v1>

export const Default: Story = {}
