import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from 'ui'

export default {
  title: 'components/Dropdown/v2',
  tags: ['autodocs'],
  component: Dropdown.v2,
  argTypes: {
    position: {
      type: {
        name: 'enum',
        value: [
          'top-start',
          'top-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end',
          'left-start',
          'left-end'
        ]
      }
    },
    trigger: {
      type: 'function'
    },
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
    className: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Dropdown.v2>

type Story = StoryObj<typeof Dropdown.v2>

export const Default: Story = {
  args: {
    position: 'top-start',
    trigger: 'Trigger',
    onClick: (index) => console.log(index),
    list: ['Item 1', 'Item 2', 'Item 3']
  },
  render: (props) => (
    <div className="flex h-80 items-center justify-center">
      <Dropdown.v2 {...props} />
    </div>
  )
}
