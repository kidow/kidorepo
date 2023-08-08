import type { Meta, StoryObj } from '@storybook/react'
import { BackTop } from 'ui'

export default {
  title: 'components/BackTop/v1',
  tags: ['autodocs'],
  component: BackTop.v1,
  argTypes: {}
} satisfies Meta<typeof BackTop.v1>

type Story = StoryObj<typeof BackTop.v1>

export const Default: Story = {
  render: () => (
    <div className="min-h-[200vh]">
      <div>Scroll down!!!</div>
      <BackTop.v1 />
    </div>
  )
}
