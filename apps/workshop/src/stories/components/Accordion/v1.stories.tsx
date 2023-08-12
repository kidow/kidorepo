import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from 'ui'

export default {
  title: 'components/Accordion/v1',
  tags: ['autodocs'],
  component: Accordion.v1,
  argTypes: {
    title: {
      type: 'string',
      defaultValue: 'TITLE'
    },
    content: {
      type: 'string',
      defaultValue: 'CONTENT'
    }
  }
} satisfies Meta<typeof Accordion.v1>

type Story = StoryObj<typeof Accordion.v1>

export const Default: Story = {
  args: {
    title: 'TITLE',
    content: 'CONTENT'
  },
  render: (props) => (
    <ul className="space-y-4">
      {Array.from({ length: 3 }).map((_, key) => (
        <Accordion.v1 key={key} {...props} />
      ))}
    </ul>
  )
}
