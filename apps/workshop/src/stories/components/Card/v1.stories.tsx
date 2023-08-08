import type { Meta, StoryObj } from '@storybook/react'
import { Card } from 'ui'

export default {
  title: 'components/Card/v1',
  tags: ['autodocs'],
  component: Card.v1,
  argTypes: {}
} satisfies Meta<typeof Card.v1>

type Story = StoryObj<typeof Card.v1>

export const Default: Story = {}
