import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from 'ui'

export default {
  title: 'components/Skeleton/v1',
  tags: ['autodocs'],
  component: Skeleton.v1,
  argTypes: {}
} satisfies Meta<typeof Skeleton.v1>

type Story = StoryObj<typeof Skeleton.v1>

export const Default: Story = {}
