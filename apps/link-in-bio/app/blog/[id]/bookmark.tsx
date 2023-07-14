import type { FC } from 'react'
import { type BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Props extends BookmarkBlockObjectResponse {}

const Bookmark: FC<Props> = (block) => {
  return <>Bookmark</>
}

export default Bookmark
