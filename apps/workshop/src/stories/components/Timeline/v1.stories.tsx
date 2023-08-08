import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from 'ui'

export default {
  title: 'components/Timeline/v1',
  tags: ['autodocs'],
  component: Timeline.v1,
  argTypes: {}
} satisfies Meta<typeof Timeline.v1>

type Story = StoryObj<typeof Timeline.v1>

export const Default: Story = {}
