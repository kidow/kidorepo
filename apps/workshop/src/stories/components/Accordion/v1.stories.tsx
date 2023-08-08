import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from 'ui'

export default {
  title: 'components/Accordion/v1',
  tags: ['autodocs'],
  component: Accordion.v1,
  argTypes: {}
} satisfies Meta<typeof Accordion.v1>

type Story = StoryObj<typeof Accordion.v1>

export const Default: Story = {}
