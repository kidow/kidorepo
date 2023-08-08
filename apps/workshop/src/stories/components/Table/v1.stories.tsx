import type { Meta, StoryObj } from '@storybook/react'
import { Table } from 'ui'

export default {
  title: 'components/Table/v1',
  tags: ['autodocs'],
  component: Table.v1,
  argTypes: {}
} satisfies Meta<typeof Table.v1>

type Story = StoryObj<typeof Table.v1>

export const Default: Story = {}
