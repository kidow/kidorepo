import Link from 'next/link'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

interface Props extends BlogItem {}

export default function Post(page: Props) {
  return (
    <li>
      <article className="group relative overflow-hidden rounded-[10px] border">
        <div className="overflow-hidden">
          <img
            src={page.cover?.external?.url || page.cover?.file?.url}
            alt="Title"
            width={390}
            height={260}
            className="h-[260px] w-full object-cover duration-200 group-hover:scale-125 xl:w-[390px]"
            style={{ viewTransitionName: `blog-cover-${page.id}` }}
          />
        </div>
        <div className="space-y-2 p-5 xl:p-6">
          <h2 className="overflow-hidden text-2xl font-extrabold text-slate-900 xl:h-16">
            <span className="after:bg-primary relative block after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
              {page.properties?.제목?.title[0]?.plain_text}
            </span>
          </h2>
          <p className="line-clamp-2 text-slate-500">
            {page.properties?.설명?.rich_text[0]?.plain_text}
          </p>
          <time dateTime={page.created_time} className="text-sm text-slate-400">
            {dayjs(page.created_time).locale('ko').format('YYYY년 M월 D일')}
          </time>
        </div>
        <Link href={`/blog/${page.id}`} className="absolute inset-0">
          <span className="sr-only">View Article</span>
        </Link>
      </article>
    </li>
  )
}
