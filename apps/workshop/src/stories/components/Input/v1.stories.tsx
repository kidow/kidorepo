import type { Meta, StoryObj } from '@storybook/react'
import { Input } from 'ui'

export default {
  title: 'components/Input/v1',
  tags: ['autodocs'],
  component: Input.v1,
  argTypes: {}
} satisfies Meta<typeof Input.v1>

type Story = StoryObj<typeof Input.v1>

export const Default: Story = {}
