import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from 'ui'

export default {
  title: 'components/Textarea/v1',
  tags: ['autodocs'],
  component: Textarea.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    },
    onEnter: {
      type: 'function'
    },
    info: {
      type: 'string'
    },
    error: {
      type: 'string'
    },
    float: {
      type: 'boolean'
    },
    fullWidth: {
      type: 'boolean'
    },
    placeholder: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Textarea.v1>

type Story = StoryObj<typeof Textarea.v1>

export const Default: Story = {
  args: {
    value: 'Textarea',
    onChange: (e) => console.log(e.target.value),
    placeholder: 'Label'
  }
}
