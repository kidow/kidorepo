import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from 'ui'

export default {
  title: 'components/Breadcrumb/v1',
  tags: ['autodocs'],
  component: Breadcrumb.v1,
  argTypes: {
    list: {
      type: {
        name: 'array',
        value: {
          name: 'object',
          value: {
            path: {
              name: 'string'
            },
            name: {
              name: 'string'
            }
          }
        }
      }
    }
  }
} satisfies Meta<typeof Breadcrumb.v1>

type Story = StoryObj<typeof Breadcrumb.v1>

export const Default: Story = {
  args: {
    list: [
      { path: '/', name: 'Home' },
      { path: '/archive/intro', name: 'Archive' },
      { path: '/archive/javascript/navigation', name: 'Navigation' },
      { path: '/archive/javascript/navigation/Breadcrumb', name: 'Breadcrumb' }
    ]
  }
}
