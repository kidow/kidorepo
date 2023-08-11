import { Client } from '@notionhq/client'
import type {
  GetBlockResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'
import { cn } from 'utils'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

function isFullBlock<Type extends BlockType>(
  block: GetBlockResponse,
  type?: Type
): block is Block<Type> {
  return 'type' in block && type ? block.type === type : true
}

async function* iteratePaginatedAPI<Args extends PaginatedArgs, Item>(
  listFn: (args: Args) => Promise<PaginatedList<Item>>,
  firstPageArgs: Args
): AsyncIterableIterator<Item> {
  let nextCursor: string | null | undefined = firstPageArgs.start_cursor
  let hasMore = true
  let total = 0
  let page = 0

  while (hasMore) {
    const { results, next_cursor, has_more } = await listFn({
      ...firstPageArgs,
      start_cursor: nextCursor
    })
    hasMore = has_more
    nextCursor = next_cursor
    page++
    total += results.length
    yield* results
  }
}

/**
 * Fetch all supported children of a block.
 * @category Block
 */
export async function getChildBlocks(parentBlockId: string): Promise<Block[]> {
  const blocks: Array<Block> = []

  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: parentBlockId
  })) {
    if (isFullBlock(block)) {
      blocks.push(block)
    }
  }

  return blocks
}

/**
 * Recursively fetch all children of `parentBlockId` as `BlockWithChildren`.
 * This function can be used to fetch an entire page's contents in one call.
 * @category Block
 */
export async function getChildBlocksWithChildrenRecursively(
  parentId: string
): Promise<BlockWithChildren[]> {
  const blocks = (await getChildBlocks(parentId)) as BlockWithChildren[]

  if (blocks.length === 0) {
    return []
  }

  const result = await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        block.children = await getChildBlocksWithChildrenRecursively(block.id)
      } else {
        block.children = []
      }
      return block
    })
  )

  return result
}

export const getRichTextClassName = ({
  annotations: { bold, italic, strikethrough, underline, code, color },
  href
}: RichTextItemResponse) =>
  cn({
    'font-semibold': bold,
    italic: italic,
    'line-through': strikethrough,
    underline: underline || href,
    'notion-code': code,
    'text-red-500': color === 'red',
    'text-orange-500': color === 'orange',
    'text-yellow-500': color === 'yellow',
    'text-green-500': color === 'green',
    'text-blue-500': color === 'blue',
    'text-purple-500': color === 'purple',
    'text-pink-500': color === 'pink',
    'text-gray-500': color === 'gray',
    'text-yellow-900': color === 'brown',
    'bg-red-100': color === 'red_background',
    'bg-orange-100': color === 'orange_background',
    'bg-yellow-100': color === 'yellow_background',
    'bg-green-100': color === 'green_background',
    'bg-blue-100': color === 'blue_background',
    'bg-purple-100': color === 'purple_background',
    'bg-pink-100': color === 'pink_background',
    'bg-gray-100': color === 'gray_background',
    'bg-amber-100': color === 'brown_background'
  })

export function getYouTubeVideoId(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

  const match = url.match(regExp)
  if (match && match[7].length === 11) {
    return match[7]
  } else {
    console.error('Invalid YouTube URL')
    return null
  }
}

export function isUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    uuid
  )
}
