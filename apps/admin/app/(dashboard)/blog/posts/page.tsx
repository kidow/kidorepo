import { cookies } from 'next/headers'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase.from('posts').select('*')

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">블로그 포스트</h2>
        <Link
          href="/blog/posts/create"
          className="rounded-md bg-stone-200 px-3 py-2"
        >
          새 포스트
        </Link>
      </div>
      <section>
        <ul className="space-y-4">
          <li></li>
        </ul>
      </section>
    </>
  )
}
