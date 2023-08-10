import type { Meta, StoryObj } from '@storybook/react'
import { Table } from 'ui'

export default {
  title: 'components/Table/v1',
  tags: ['autodocs'],
  component: Table.v1,
  argTypes: {
    list: {
      type: {
        name: 'array',
        value: {
          name: 'other',
          value: ''
        }
      }
    },
    columns: {
      type: 'symbol'
    },
    renderItem: {
      type: 'function'
    },
    summary: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    loading: {
      type: 'boolean'
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md', 'lg']
      }
    }
  }
} satisfies Meta<typeof Table.v1>

type Story = StoryObj<typeof Table.v1>

export const Default: Story = {
  args: {
    list: [
      { company: 'Apple', country: 'US', ceo: 'Tim Cook' },
      { company: 'Tesla', country: 'US', ceo: 'Elon Musk' },
      { company: 'Facebook', country: 'US', ceo: 'Mark Zuckerburg' },
      { company: 'Microsoft', country: 'US', ceo: 'Satya Nadella' }
    ],
    columns: (
      <tr>
        <th scope="col">Company</th>
        <th scope="col">Country</th>
        <th scope="col">CEO</th>
      </tr>
    ),
    renderItem: (item: any, key) => (
      <tr key={key}>
        <td>{item.company}</td>
        <td>{item.country}</td>
        <td>{item.ceo}</td>
      </tr>
    ),
    title: 'CEO',
    summary: 'Company CEOs',
    size: 'md'
  }
}
