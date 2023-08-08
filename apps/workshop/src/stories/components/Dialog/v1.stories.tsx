import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from 'ui'

export default {
  title: 'components/Dialog/v1',
  tags: ['autodocs'],
  component: Dialog.v1,
  argTypes: {}
} satisfies Meta<typeof Dialog.v1>

type Story = StoryObj<typeof Dialog.v1>

export const Default: Story = {}
