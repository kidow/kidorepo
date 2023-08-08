import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'ui'

export default {
  title: 'components/Avatar/v1',
  tags: ['autodocs'],
  component: Avatar.v1,
  argTypes: {
    src: {
      type: 'string',
      defaultValue: 'https://i.pravatar.cc'
    },
    alt: {
      type: 'string'
    },
    shape: {
      type: {
        name: 'enum',
        value: ['circle', 'shape']
      },
      defaultValue: 'circle'
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      defaultValue: 'md'
    },
    border: {
      type: 'boolean',
      defaultValue: false
    }
  }
} satisfies Meta<typeof Avatar.v1>

type Story = StoryObj<typeof Avatar.v1>

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc',
    alt: 'avatar',
    shape: 'circle',
    size: 'md',
    border: false
  }
}
