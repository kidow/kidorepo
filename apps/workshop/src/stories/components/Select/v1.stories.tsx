import type { Meta, StoryObj } from '@storybook/react'
import { Select } from 'ui'

export default {
  title: 'components/Select/v1',
  tags: ['autodocs'],
  component: Select.v1,
  argTypes: {}
} satisfies Meta<typeof Select.v1>

type Story = StoryObj<typeof Select.v1>

export const Default: Story = {}
