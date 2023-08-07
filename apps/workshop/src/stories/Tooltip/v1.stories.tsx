import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from 'ui'

export default {
  title: 'components/Tooltip/v1',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      type: 'string',
      defaultValue: 'content'
    },
    position: {
      type: {
        name: 'enum',
        value: ['top', 'right', 'bottom', 'left']
      },
      defaultValue: 'top'
    },
    arrow: {
      type: 'boolean',
      defaultValue: true
    }
  }
} satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    position: 'top',
    content: 'tooltip',
    arrow: true
  },
  render: (props) => (
    <div className="flex h-24 items-center justify-center">
      <Tooltip {...props}>
        <span>Tooltip</span>
      </Tooltip>
    </div>
  )
}
