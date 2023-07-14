import type { FC } from 'react'
import Link from 'next/link'
import { type TableBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import classnames from 'classnames'

export interface Props extends TableBlockObjectResponse {}

const Table: FC<Props> = (block) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Heading 1</th>
          <th>Heading 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1, 1</td>
          <td>1, 2</td>
        </tr>
        <tr>
          <td>2, 1</td>
          <td>2, 2</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
