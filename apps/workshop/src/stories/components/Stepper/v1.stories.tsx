import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from 'ui'

export default {
  title: 'components/Stepper/v1',
  tags: ['autodocs'],
  component: Stepper.v1,
  argTypes: {}
} satisfies Meta<typeof Stepper.v1>

type Story = StoryObj<typeof Stepper.v1>

export const Default: Story = {}
