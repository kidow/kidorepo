import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from 'ui'

export default {
  title: 'components/Slider/v1',
  tags: ['autodocs'],
  component: Slider.v1,
  argTypes: {}
} satisfies Meta<typeof Slider.v1>

type Story = StoryObj<typeof Slider.v1>

export const Default: Story = {}
