type AnyBlock = Extract<GetBlockResponse, { type: string }>

type BlockType = AnyBlock['type']

type Block<Type extends BlockType = BlockType> = Extract<
  AnyBlock,
  { type: Type }
>

type BlockWithChildren<Type extends BlockType = BlockType> = Block<Type> & {
  children: BlockWithChildren[]
}

interface PaginatedArgs {
  start_cursor?: string
  page_size?: number
}

interface PaginatedList<T> {
  object: 'list'
  results: T[]
  next_cursor: string | null
  has_more: boolean
}

type WithAuth<P> = P & {
  auth?: string
}
