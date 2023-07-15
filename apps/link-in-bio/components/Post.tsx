import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

import 'dayjs/locale/ko'

interface Props extends NotionItem {}

export default function Post(item: Props) {
  return (
    <li>
      <article className="group relative rounded-[10px] border">
        <div className="overflow-hidden">
          <Image
            src={item.cover?.external?.url}
            alt="Title"
            width={390}
            height={260}
            priority
            className="h-[260px] w-[390px] duration-200 group-hover:scale-125"
            style={{ viewTransitionName: `blog-cover-${item.id}` }}
          />
        </div>
        <div className="space-y-2 p-5 xl:p-6">
          <h2 className="after:bg-primary relative inline-block overflow-hidden text-2xl font-extrabold text-slate-900 after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
            {item.properties?.제목?.title[0]?.plain_text}
          </h2>
          <p className="line-clamp-2 text-slate-500">
            {item.properties?.설명?.rich_text[0]?.plain_text}
          </p>
          <time className="text-sm text-slate-400">
            {dayjs(item.created_time).locale('ko').format('YYYY년 M월 D일')}
          </time>
        </div>
        <Link href={`/blog/${item.id}`} className="absolute inset-0">
          <span className="sr-only">View Article</span>
        </Link>
      </article>
    </li>
  )
}