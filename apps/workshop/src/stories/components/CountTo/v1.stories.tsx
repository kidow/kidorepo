import type { Meta, StoryObj } from '@storybook/react'
import { CountTo } from 'ui'

export default {
  title: 'components/CountTo/v1',
  tags: ['autodocs'],
  component: CountTo.v1,
  argTypes: {
    from: {
      type: 'number',
      defaultValue: 0
    },
    to: {
      type: 'number'
    },
    duration: {
      type: 'number',
      defaultValue: 2000
    },
    className: {
      type: 'string'
    }
  }
} satisfies Meta<typeof CountTo.v1>

type Story = StoryObj<typeof CountTo.v1>

export const Default: Story = {
  args: {
    from: 0,
    to: 3000,
    duration: 2000
  }
}
