import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'ui'

export default {
  title: 'components/Button/v2',
  tags: ['autodocs'],
  component: Button.v2,
  argTypes: {
    text: {
      type: 'string'
    },
    loading: {
      type: 'boolean',
      defaultValue: false
    },
    theme: {
      type: {
        name: 'enum',
        value: ['primary']
      }
    },
    className: {
      type: 'string'
    },
    disabled: {
      type: 'boolean',
      defaultValue: false
    },
    type: {
      type: {
        name: 'enum',
        value: ['submit', 'reset', 'button']
      }
    }
  }
} satisfies Meta<typeof Button.v2>

type Story = StoryObj<typeof Button.v2>

export const Default: Story = {
  args: {
    text: 'Button',
    theme: 'primary'
  },
  render: (props) => <Button.v2 {...props} />
}
