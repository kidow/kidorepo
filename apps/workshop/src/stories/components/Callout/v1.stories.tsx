import type { Meta, StoryObj } from '@storybook/react'
import { Callout } from 'ui'

export default {
  title: 'components/Callout/v1',
  tags: ['autodocs'],
  component: Callout.v1,
  argTypes: {}
} satisfies Meta<typeof Callout.v1>

type Story = StoryObj<typeof Callout.v1>

export const Default: Story = {}
