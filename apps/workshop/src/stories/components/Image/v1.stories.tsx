import type { Meta, StoryObj } from '@storybook/react'
import { Image } from 'ui'

export default {
  title: 'components/Image/v1',
  tags: ['autodocs'],
  component: Image.v1,
  argTypes: {
    src: {
      type: 'string'
    },
    alt: {
      type: 'string'
    },
    className: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Image.v1>

type Story = StoryObj<typeof Image.v1>

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc',
    alt: 'alt'
  },
  render: (props) => <Image.v1 {...props} className="h-40 w-40" />
}
