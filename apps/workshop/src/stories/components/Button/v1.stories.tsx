import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'ui'

export default {
  title: 'components/Button/v1',
  tags: ['autodocs'],
  component: Button.v1,
  argTypes: {}
} satisfies Meta<typeof Button.v1>

type Story = StoryObj<typeof Button.v1>

export const Default: Story = {}
