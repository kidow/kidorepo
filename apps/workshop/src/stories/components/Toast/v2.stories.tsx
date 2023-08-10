import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from 'ui'
import { toast } from 'utils'

export default {
  title: 'components/Toast/v2',
  tags: ['autodocs'],
  component: Toast.v2,
  argTypes: {}
} satisfies Meta<typeof Toast.v2>

type Story = StoryObj<typeof Toast.v2>

export const Default: Story = {
  render: () => (
    <>
      <div className="flex gap-4">
        <button onClick={() => toast.success('success')}>Success</button>
        <button onClick={() => toast.info('info')}>Info</button>
        <button onClick={() => toast.warn('warn')}>Warn</button>
        <button onClick={() => toast.error('error')}>Error</button>
      </div>
      <Toast.v2 />
    </>
  )
}
