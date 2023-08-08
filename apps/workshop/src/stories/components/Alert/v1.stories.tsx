import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from 'ui'

export default {
  title: 'components/Alert/v1',
  tags: ['autodocs'],
  component: Alert.v1,
  argTypes: {}
} satisfies Meta<typeof Alert.v1>

type Story = StoryObj<typeof Alert.v1>

export const Default: Story = {}
