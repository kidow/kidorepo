import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from 'ui'

export default {
  title: 'components/Breadcrumbs/v1',
  tags: ['autodocs'],
  component: Breadcrumbs.v1,
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
} satisfies Meta<typeof Breadcrumbs.v1>

type Story = StoryObj<typeof Breadcrumbs.v1>

export const Default: Story = {
  args: {
    list: [
      { path: '/', name: 'Home' },
      { path: '/archive/intro', name: 'Archive' },
      { path: '/archive/javascript/navigation', name: 'Navigation' },
      {
        path: '/archive/javascript/navigation/Breadcrumbs',
        name: 'Breadcrumbs'
      }
    ]
  }
}
