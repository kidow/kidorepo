import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from 'ui'

export default {
  title: 'components/Carousel/v1',
  tags: ['autodocs'],
  component: Carousel.v1,
  argTypes: {}
} satisfies Meta<typeof Carousel.v1>

type Story = StoryObj<typeof Carousel.v1>

export const Default: Story = {}
