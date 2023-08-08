import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from 'ui'

export default {
  title: 'components/Tooltip/v1',
  component: Tooltip.v1,
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
} satisfies Meta<typeof Tooltip.v1>

type Story = StoryObj<typeof Tooltip.v1>

export const Default: Story = {
  args: {
    position: 'top',
    content: 'tooltip',
    arrow: true
  },
  render: (props) => (
    <div className="flex h-24 items-center justify-center">
      <Tooltip.v1 {...props}>
        <span>Tooltip</span>
      </Tooltip.v1>
    </div>
  )
}
