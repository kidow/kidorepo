import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'ui'

export default {
  title: 'components/Button/v1',
  tags: ['autodocs'],
  component: Button.v1,
  argTypes: {
    loading: {
      type: 'boolean',
      defaultValue: false
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md', 'lg']
      },
      defaultValue: 'md'
    },
    theme: {
      type: {
        name: 'enum',
        value: ['danger', 'primary', 'success']
      }
    },
    disabled: {
      type: 'boolean',
      defaultValue: false
    },
    shape: {
      type: {
        name: 'enum',
        value: ['text', 'contained', 'outlined']
      },
      defaultValue: 'contained'
    },
    ripple: {
      type: 'boolean',
      defaultValue: false
    }
  }
} satisfies Meta<typeof Button.v1>

type Story = StoryObj<typeof Button.v1>

export const Default: Story = {
  args: {
    size: 'md',
    shape: 'contained'
  },
  render: (props) => <Button.v1 {...props}>Button</Button.v1>
}
