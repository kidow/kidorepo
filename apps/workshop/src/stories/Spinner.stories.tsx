import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from 'ui'

export default {
  title: 'components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    className: {
      defaultValue: 'h-5 w-5',
      description: 'defaultValue: `h-5 w-5`'
    }
  }
} satisfies Meta<typeof Spinner>

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    className: 'h-6 w-6'
  }
}
