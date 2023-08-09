import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from 'ui'

export default {
  title: 'components/Progress/v1',
  tags: ['autodocs'],
  component: Progress.v1,
  argTypes: {
    value: {
      type: 'number'
    }
  }
} satisfies Meta<typeof Progress.v1>

type Story = StoryObj<typeof Progress.v1>

export const Default: Story = {
  args: {
    value: 50
  }
}
