import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from 'ui'

export default {
  title: 'components/Tabs/v1',
  tags: ['autodocs'],
  component: Tabs.v1,
  argTypes: {
    list: {
      type: {
        name: 'array',
        value: {
          name: 'string'
        }
      }
    },
    value: {
      type: 'number'
    },
    onChange: {
      type: 'function'
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md']
      }
    }
  }
} satisfies Meta<typeof Tabs.v1>

type Story = StoryObj<typeof Tabs.v1>

export const Default: Story = {}
