import type { Meta, StoryObj } from '@storybook/react'
import { Swiper } from 'ui'

export default {
  title: 'components/Swiper/v1',
  tags: ['autodocs'],
  component: Swiper.v1,
  argTypes: {}
} satisfies Meta<typeof Swiper.v1>

type Story = StoryObj<typeof Swiper.v1>

export const Default: Story = {}
