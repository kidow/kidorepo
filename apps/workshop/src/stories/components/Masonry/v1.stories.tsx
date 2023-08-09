import type { Meta, StoryObj } from '@storybook/react'
import { Masonry } from 'ui'

export default {
  title: 'components/Masonry/v1',
  tags: ['autodocs'],
  component: Masonry.v1
} satisfies Meta<typeof Masonry.v1>

type Story = StoryObj<typeof Masonry.v1>

export const Default: Story = {
  render: () => (
    <Masonry.v1>
      {Array.from({ length: 12 }).map((_, key) => (
        <li key={key}>
          <img
            src={`https://picsum.photos/200/${
              Math.ceil(Math.random() * 5) * 100
            }`}
            alt=""
            className="rounded-lg"
          />
        </li>
      ))}
    </Masonry.v1>
  )
}
