import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from 'ui'

export default {
  title: 'components/ColorPicker/v1',
  tags: ['autodocs'],
  component: ColorPicker.v1,
  argTypes: {}
} satisfies Meta<typeof ColorPicker.v1>

type Story = StoryObj<typeof ColorPicker.v1>

export const Default: Story = {}
