import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from 'ui'

export default {
  title: 'components/Pagination/v2',
  tags: ['autodocs'],
  component: Pagination.v2,
  argTypes: {
    page: {
      type: 'number',
      defaultValue: 1
    },
    total: {
      type: 'number',
      defaultValue: 0
    },
    size: {
      type: 'number'
    },
    onChange: {
      type: 'function'
    }
  }
} satisfies Meta<typeof Pagination.v2>

type Story = StoryObj<typeof Pagination.v2>

export const Default: Story = {
  args: {
    page: 1,
    total: 100,
    size: 10
  }
}
