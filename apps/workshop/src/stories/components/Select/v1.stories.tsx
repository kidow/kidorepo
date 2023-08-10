import type { Meta, StoryObj } from '@storybook/react'
import { Select } from 'ui'

export default {
  title: 'components/Select/v1',
  tags: ['autodocs'],
  component: Select.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md', 'lg']
      }
    },
    error: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Select.v1>

type Story = StoryObj<typeof Select.v1>

export const Default: Story = {
  args: {
    value: 'google',
    onChange: (value) => console.log(value),
    size: 'md'
  },
  render: (props) => (
    <Select.v1 {...props}>
      <option>Select</option>
      <option value="google">Google</option>
      <option value="amazon">Amazon</option>
      <option value="apple">Apple</option>
      <option value="tesla">Tesla</option>
    </Select.v1>
  )
}

export const Error: Story = {
  args: {
    value: 'google',
    onChange: (value) => console.log(value),
    size: 'md',
    error: 'Error'
  },
  render: (props) => (
    <Select.v1 {...props}>
      <option>Select</option>
      <option value="google">Google</option>
      <option value="amazon">Amazon</option>
      <option value="apple">Apple</option>
      <option value="tesla">Tesla</option>
    </Select.v1>
  )
}
