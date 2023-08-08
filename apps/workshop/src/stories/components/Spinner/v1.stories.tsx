import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from 'ui'

export default {
  title: 'components/Spinner/v1',
  tags: ['autodocs'],
  component: Spinner.v1,
  argTypes: {
    className: {
      type: 'string',
      defaultValue: 'h-5 w-5'
    }
  }
} satisfies Meta<typeof Spinner.v1>

type Story = StoryObj<typeof Spinner.v1>

export const Default: Story = {
  args: {
    className: 'h-5 w-5'
  }
}
