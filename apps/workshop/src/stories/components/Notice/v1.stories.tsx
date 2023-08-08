import type { Meta, StoryObj } from '@storybook/react'
import { Notice } from 'ui'

export default {
  title: 'components/Notice/v1',
  tags: ['autodocs'],
  component: Notice.v1,
  argTypes: {}
} satisfies Meta<typeof Notice.v1>

type Story = StoryObj<typeof Notice.v1>

export const Default: Story = {}
