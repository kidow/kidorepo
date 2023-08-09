import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from 'ui'

export default {
  title: 'components/ColorPicker/v1',
  tags: ['autodocs'],
  component: ColorPicker.v1,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    }
  }
} satisfies Meta<typeof ColorPicker.v1>

type Story = StoryObj<typeof ColorPicker.v1>

export const Default: Story = {
  args: {
    value: '#dffc03',
    onChange: (value) => console.log(value)
  },
  render: (props) => <ColorPicker.v1 {...props} />
}
