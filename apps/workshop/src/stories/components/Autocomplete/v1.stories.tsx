import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete } from 'ui'

export default {
  title: 'components/Autocomplete/v1',
  tags: ['autodocs'],
  component: Autocomplete.v1,
  argTypes: {}
} satisfies Meta<typeof Autocomplete.v1>

type Story = StoryObj<typeof Autocomplete.v1>

export const Default: Story = {}
