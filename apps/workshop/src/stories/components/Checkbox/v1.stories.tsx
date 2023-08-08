import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from 'ui'

export default {
  title: 'components/Checkbox/v1',
  tags: ['autodocs'],
  component: Checkbox.v1,
  argTypes: {
    label: {
      type: 'string'
    },
    indeterminate: {
      type: 'boolean'
    },
    checked: {
      type: 'boolean'
    },
    onChange: {
      type: 'function'
    },
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md', 'lg', 'xl']
      },
      defaultValue: 'md'
    },
    disabled: {
      type: 'boolean'
    }
  }
} satisfies Meta<typeof Checkbox.v1>

type Story = StoryObj<typeof Checkbox.v1>

export const Default: Story = {
  args: {
    label: 'Label',
    indeterminate: false,
    checked: true,
    onChange: (checked) => console.log(checked),
    size: 'md',
    disabled: false
  }
}
