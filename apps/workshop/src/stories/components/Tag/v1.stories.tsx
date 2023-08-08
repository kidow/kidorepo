import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from 'ui'

export default {
  title: 'components/Tag/v1',
  tags: ['autodocs'],
  component: Tag.v1,
  argTypes: {}
} satisfies Meta<typeof Tag.v1>

type Story = StoryObj<typeof Tag.v1>

export const Default: Story = {}
