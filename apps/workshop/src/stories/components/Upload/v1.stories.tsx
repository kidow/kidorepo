import type { Meta, StoryObj } from '@storybook/react'
import { Upload } from 'ui'

export default {
  title: 'components/Upload/v1',
  tags: ['autodocs'],
  component: Upload.v1,
  argTypes: {}
} satisfies Meta<typeof Upload.v1>

type Story = StoryObj<typeof Upload.v1>

export const Default: Story = {}
