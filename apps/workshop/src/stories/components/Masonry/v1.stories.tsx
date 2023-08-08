import type { Meta, StoryObj } from '@storybook/react'
import { Masonry } from 'ui'

export default {
  title: 'components/Masonry/v1',
  tags: ['autodocs'],
  component: Masonry.v1,
  argTypes: {}
} satisfies Meta<typeof Masonry.v1>

type Story = StoryObj<typeof Masonry.v1>

export const Default: Story = {}
