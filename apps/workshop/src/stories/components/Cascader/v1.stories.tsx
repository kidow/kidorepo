import type { Meta, StoryObj } from '@storybook/react'
import { Cascader } from 'ui'

export default {
  title: 'components/Cascader/v1',
  tags: ['autodocs'],
  component: Cascader.v1,
  argTypes: {}
} satisfies Meta<typeof Cascader.v1>

type Story = StoryObj<typeof Cascader.v1>

export const Default: Story = {}
