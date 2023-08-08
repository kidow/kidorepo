import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from 'ui'

export default {
  title: 'components/Radio/v1',
  tags: ['autodocs'],
  component: Radio.v1,
  argTypes: {}
} satisfies Meta<typeof Radio.v1>

type Story = StoryObj<typeof Radio.v1>

export const Default: Story = {}
