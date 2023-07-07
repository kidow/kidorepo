import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">Blog</h1>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {Array.from({ length: 6 }).map((_, key) => (
          <li key={key}>
            <article className="group relative rounded-[10px] border">
              <div className="overflow-hidden">
                <Image
                  src="https://illustrations.popsy.co/white/creative-work.svg"
                  alt="Title"
                  width={390}
                  height={260}
                  priority
                  className="h-[260px] duration-200 group-hover:scale-125"
                />
              </div>
              <div className="space-y-2 p-5 xl:p-6">
                <h2 className="after:bg-primary relative inline-block overflow-hidden text-2xl font-extrabold text-slate-900 after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
                  블로그를 또 한 번 개편했다.
                </h2>
                <p className="line-clamp-2 text-slate-500">
                  블로그를 7번이나 개편한 이유는 무엇일까?
                </p>
                <p className="text-sm text-slate-400">2023년 7월 7일</p>
              </div>
              <Link href="/blog/1" className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
