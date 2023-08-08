import type { Meta, StoryObj } from '@storybook/react'
import { Navigation } from 'ui'

export default {
  title: 'components/Navigation/v1',
  tags: ['autodocs'],
  component: Navigation.v1,
  argTypes: {}
} satisfies Meta<typeof Navigation.v1>

type Story = StoryObj<typeof Navigation.v1>

export const Default: Story = {}
