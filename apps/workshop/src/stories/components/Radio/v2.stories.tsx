import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from 'ui'

export default {
  title: 'components/Radio/v2',
  tags: ['autodocs'],
  component: Radio.v2,
  argTypes: {
    value: {
      type: 'string'
    },
    onChange: {
      type: 'function'
    },
    options: {
      type: {
        name: 'array',
        value: {
          name: 'object',
          value: {
            name: {
              name: 'string'
            },
            description: {
              name: 'string'
            },
            value: {
              name: 'string'
            },
            disabled: {
              name: 'boolean'
            }
          }
        }
      }
    },
    direction: {
      type: {
        name: 'enum',
        value: ['horizontal', 'vertical']
      }
    }
  }
} satisfies Meta<typeof Radio.v2>

type Story = StoryObj<typeof Radio.v2>

export const Default: Story = {
  args: {
    value: 'apple',
    options: [
      { name: 'Apple', value: 'apple', description: 'iPhone' },
      { name: 'Amazon', value: 'amazon', description: 'Twitch' },
      { name: 'Google', value: 'google', description: 'Youtube' },
      { name: 'Tesla', value: 'tesla', description: 'Twitter', disabled: true }
    ],
    direction: 'horizontal'
  }
}
