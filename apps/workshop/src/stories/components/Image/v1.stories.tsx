import type { Meta, StoryObj } from '@storybook/react'
import { Image } from 'ui'

export default {
  title: 'components/Image/v1',
  tags: ['autodocs'],
  component: Image.v1,
  argTypes: {}
} satisfies Meta<typeof Image.v1>

type Story = StoryObj<typeof Image.v1>

export const Default: Story = {}
