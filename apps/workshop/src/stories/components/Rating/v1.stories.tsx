import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from 'ui'

export default {
  title: 'components/Rating/v1',
  tags: ['autodocs'],
  component: Rating.v1,
  argTypes: {}
} satisfies Meta<typeof Rating.v1>

type Story = StoryObj<typeof Rating.v1>

export const Default: Story = {}
