import type { Meta, StoryObj } from '@storybook/react'
import { Tree } from 'ui'

export default {
  title: 'components/Tree/v1',
  tags: ['autodocs'],
  component: Tree.v1,
  argTypes: {}
} satisfies Meta<typeof Tree.v1>

type Story = StoryObj<typeof Tree.v1>

export const Default: Story = {}
