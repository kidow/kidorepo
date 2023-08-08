import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from 'ui'

export default {
  title: 'components/Breadcrumb/v1',
  tags: ['autodocs'],
  component: Breadcrumb.v1,
  argTypes: {}
} satisfies Meta<typeof Breadcrumb.v1>

type Story = StoryObj<typeof Breadcrumb.v1>

export const Default: Story = {}
