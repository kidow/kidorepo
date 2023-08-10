import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from 'ui'

export default {
  title: 'components/Switch/v1',
  tags: ['autodocs'],
  component: Switch.v1,
  argTypes: {
    checked: {
      type: 'boolean'
    },
    onChange: {
      type: 'function'
    },
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md', 'lg']
      }
    },
    disabled: {
      type: 'boolean'
    }
  }
} satisfies Meta<typeof Switch.v1>

type Story = StoryObj<typeof Switch.v1>

export const Default: Story = {
  args: {
    checked: false,
    onChange: (checked) => console.log(checked),
    size: 'md',
    disabled: false
  }
}
