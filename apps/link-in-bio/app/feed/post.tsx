import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import Link from 'next/link'

interface Props extends FeedItem, ReactProps {}

export default function Post({ children, ...page }: Props) {
  return (
    <div>
      <article className="sm:rounded-[10px] sm:border sm:p-5 xl:p-6">
        <time dateTime={page.created_time} className="text-sm text-neutral-400">
          {dayjs(page.created_time).locale('ko').format('YYYY년 M월 D일')}
        </time>
        <h2 className="text-2xl font-semibold">
          <Link href={`/feed/${page.id}`} className="hover:underline">
            {page.properties?.제목?.title[0]?.plain_text}
          </Link>
        </h2>
        <div className="prose prose-slate mt-4 max-w-prose">{children}</div>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm">
          {page?.properties?.태그?.multi_select.map(({ name }, key) => (
            <li key={key}>
              <span className="rounded-3xl border px-3 py-2 text-slate-500">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
