import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from 'ui'

export default {
  title: 'components/Switch/v1',
  tags: ['autodocs'],
  component: Switch.v1,
  argTypes: {}
} satisfies Meta<typeof Switch.v1>

type Story = StoryObj<typeof Switch.v1>

export const Default: Story = {}
