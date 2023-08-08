import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from 'ui'

export default {
  title: 'components/Pagination/v1',
  tags: ['autodocs'],
  component: Pagination.v1,
  argTypes: {}
} satisfies Meta<typeof Pagination.v1>

type Story = StoryObj<typeof Pagination.v1>

export const Default: Story = {}
