import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from 'ui'

export default {
  title: 'components/Checkbox/v1',
  tags: ['autodocs'],
  component: Checkbox.v1,
  argTypes: {}
} satisfies Meta<typeof Checkbox.v1>

type Story = StoryObj<typeof Checkbox.v1>

export const Default: Story = {}
