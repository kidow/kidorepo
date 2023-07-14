import type { FC } from 'react'
import { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Props extends CodeBlockObjectResponse {}

const Code: FC<Props> = (block) => {
  return <>Code</>
}

export default Code
