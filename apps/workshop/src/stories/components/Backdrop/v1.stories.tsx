import type { Meta, StoryObj } from '@storybook/react'
import { Backdrop } from 'ui'
import { backdrop } from 'utils'

export default {
  title: 'components/Backdrop/v1',
  tags: ['autodocs'],
  component: Backdrop.v1
} satisfies Meta<typeof Backdrop.v1>

type Story = StoryObj<typeof Backdrop.v1>

export const Default: Story = {
  render: () => (
    <>
      <div className="flex h-40 items-center justify-center">
        <button
          onClick={() => {
            backdrop(true)
            setTimeout(() => {
              backdrop(false)
            }, 3000)
          }}
        >
          Backdrop
        </button>
      </div>
      <Backdrop.v1 />
    </>
  )
}
