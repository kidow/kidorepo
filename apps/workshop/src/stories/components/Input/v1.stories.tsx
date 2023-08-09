import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from 'ui'

export default {
  title: 'components/Input/v1',
  tags: ['autodocs'],
  component: Input.v1,
  argTypes: {
    suffix: {
      type: 'symbol'
    },
    required: {
      type: 'boolean'
    },
    placeholder: {
      type: 'string'
    },
    fullWidth: {
      type: 'boolean'
    },
    float: {
      type: 'boolean'
    },
    className: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Input.v1>

type Story = StoryObj<typeof Input.v1>

function Example() {
  const [value, setValue] = useState<string>('')
  return (
    <Input.v1
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Label"
      float
    />
  )
}

export const Default: Story = {
  render: () => <Example />
}
