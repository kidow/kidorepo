import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from 'ui'

export default {
  title: 'components/Alert/v1',
  tags: ['autodocs'],
  component: Alert.v1,
  argTypes: {
    type: {
      type: {
        name: 'enum',
        value: ['success', 'info', 'warn', 'error']
      },
      defaultValue: 'success'
    },
    message: {
      type: 'string',
      defaultValue: 'message'
    },
    close: {
      type: 'boolean',
      defaultValue: false
    }
  }
} satisfies Meta<typeof Alert.v1>

type Story = StoryObj<typeof Alert.v1>

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Success'
  }
}

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Info'
  }
}

export const Warn: Story = {
  args: {
    type: 'warn',
    message: 'Warn'
  }
}

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Error'
  }
}

export const Close: Story = {
  args: {
    type: 'success',
    message: 'Close',
    close: true
  }
}
