import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from 'ui'

export default {
  title: 'components/Dropdown/v1',
  tags: ['autodocs'],
  component: Dropdown.v1,
  argTypes: {}
} satisfies Meta<typeof Dropdown.v1>

type Story = StoryObj<typeof Dropdown.v1>

export const Default: Story = {}
