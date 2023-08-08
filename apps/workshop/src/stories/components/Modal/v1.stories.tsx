import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from 'ui'

export default {
  title: 'components/Modal/v1',
  tags: ['autodocs'],
  component: Modal.v1,
  argTypes: {}
} satisfies Meta<typeof Modal.v1>

type Story = StoryObj<typeof Modal.v1>

export const Default: Story = {}
