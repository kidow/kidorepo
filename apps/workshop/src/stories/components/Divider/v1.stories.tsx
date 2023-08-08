import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from 'ui'

export default {
  title: 'components/Divider/v1',
  tags: ['autodocs'],
  component: Divider.v1,
  argTypes: {}
} satisfies Meta<typeof Divider.v1>

type Story = StoryObj<typeof Divider.v1>

export const Default: Story = {}
