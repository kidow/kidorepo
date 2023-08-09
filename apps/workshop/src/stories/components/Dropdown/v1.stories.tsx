import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from 'ui'

export default {
  title: 'components/Dropdown/v1',
  tags: ['autodocs'],
  component: Dropdown.v1,
  argTypes: {
    list: {
      type: {
        name: 'array',
        value: {
          name: 'string'
        }
      }
    },
    onClick: {
      type: 'function'
    },
    label: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Dropdown.v1>

type Story = StoryObj<typeof Dropdown.v1>

export const Default: Story = {
  args: {
    list: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    onClick: (index) => console.log(index),
    label: 'Dropdown'
  }
}
