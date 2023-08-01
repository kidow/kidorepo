import Pagination from '@/components/Pagination'
import Post from '@/components/Post'

interface Props {
  promise: Promise<BlogList>
}

export default async function List(props: Props) {
  if (!props) return null
  const { results, next_cursor } = await props.promise
  return (
    <>
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {results.map((item) => (
          <Post {...item} key={item.id} />
        ))}
        <Pagination nextCursor={next_cursor} />
      </ul>
    </>
  )
}
