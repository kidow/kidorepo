import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from 'ui'

export default {
  title: 'components/ButtonGroup/v1',
  tags: ['autodocs'],
  component: ButtonGroup.v1,
  argTypes: {}
} satisfies Meta<typeof ButtonGroup.v1>

type Story = StoryObj<typeof ButtonGroup.v1>

export const Default: Story = {}
