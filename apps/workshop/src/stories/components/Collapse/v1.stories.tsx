import type { Meta, StoryObj } from '@storybook/react'
import { Collapse } from 'ui'

export default {
  title: 'components/Collapse/v1',
  tags: ['autodocs'],
  component: Collapse.v1,
  argTypes: {}
} satisfies Meta<typeof Collapse.v1>

type Story = StoryObj<typeof Collapse.v1>

export const Default: Story = {}
