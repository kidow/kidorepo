import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from 'ui'

export default {
  title: 'components/Rating/v1',
  tags: ['autodocs'],
  component: Rating.v1,
  argTypes: {
    value: {
      type: 'number'
    },
    onChange: {
      type: 'function'
    },
    readOnly: {
      type: 'boolean'
    },
    disabled: {
      type: 'boolean'
    },
    count: {
      type: 'number',
      defaultValue: 5
    },
    half: {
      type: 'boolean'
    }
  }
} satisfies Meta<typeof Rating.v1>

type Story = StoryObj<typeof Rating.v1>

export const Default: Story = {
  args: {
    value: 2,
    count: 5,
    onChange: (value) => console.log(value)
  }
}
