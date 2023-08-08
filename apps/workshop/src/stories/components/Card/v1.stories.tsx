import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardItem } from 'ui'

export default {
  title: 'components/Card/v1',
  tags: ['autodocs'],
  component: Card.v1,
  argTypes: {
    title: {
      type: 'string'
    },
    caption: {
      type: 'string'
    },
    footer: {
      type: 'string'
    },
    border: {
      type: 'boolean'
    },
    padding: {
      type: 'boolean'
    },
    className: {
      type: 'string'
    }
  }
} satisfies Meta<typeof Card.v1>

type Story = StoryObj<typeof Card.v1>

export const Default: Story = {
  args: {},
  render: () => (
    <Card.v1 title="Title" caption="Caption" footer="Footer" border padding>
      <CardItem.v1 label="Label 1" required fullWidth plain>
        children
      </CardItem.v1>
      <CardItem.v1 label="Label 2" required fullWidth plain>
        children
      </CardItem.v1>
    </Card.v1>
  )
}
