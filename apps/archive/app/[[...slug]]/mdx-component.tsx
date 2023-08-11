'use client'

import type { HTMLAttributes, ImgHTMLAttributes } from 'react'
import { CopyIcon } from 'lucide-react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { cn } from 'utils'

interface Props {
  code: string
}

const components = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={
        typeof props.children === 'string'
          ? props.children.toLowerCase()
          : undefined
      }
      className="mt-12 flex items-center gap-1 border-b pb-2 text-2xl font-semibold tracking-tight dark:border-neutral-800"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={
        typeof props.children === 'string'
          ? props.children.toLowerCase()
          : undefined
      }
      className="mt-8 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      id={
        typeof props.children === 'string'
          ? props.children.toLowerCase()
          : undefined
      }
      className="mt-8 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  a: (props: HTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium underline underline-offset-4" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-6 leading-7" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="mt-2" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="rounded-md" {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold dark:border-neutral-800 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left dark:border-neutral-800 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => {
    return (
      <div className="group relative">
        <pre
          className="mb-4 overflow-x-auto rounded-b-lg border border-neutral-800 p-4 text-sm text-[#e2e8f0] dark:bg-[#1e293b]"
          {...props}
        />
        <button
          onClick={() => {
            if (
              typeof window === 'undefined' ||
              typeof window.navigator === 'undefined'
            ) {
              alert('호환되지 않는 브라우저입니다.')
              return
            }

            window.navigator.clipboard
              .writeText(props.children as string)
              .then(() => alert('복사되었습니다.'))
              .catch(() => alert('실패했습니다.'))
          }}
          className="absolute right-3 top-3 hidden h-[30px] w-[30px] items-center justify-center rounded-md border bg-neutral-800 transition-all duration-150 group-hover:inline-flex dark:border-neutral-600"
          title="Copy code"
          tabIndex={0}
        >
          <span className="sr-only">Copy code</span>
          <CopyIcon size={16} />
        </button>
      </div>
    )
  },
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'hljs relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm dark:bg-neutral-800',
        props.className
      )}
      {...props}
    />
  ),
  Callout: (props: ReactProps) => <div></div>,
  Steps: (props: ReactProps) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step] dark:border-neutral-800"
      {...props}
    />
  ),
  Step: (props: ReactProps) => (
    <h3
      className="mt-8 scroll-m-20 bg-transparent text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  Tabs: (props: ReactProps) => <div></div>,
  Tab: (props: ReactProps) => <div className="relative mt-6 w-full"></div>,
  TabContent: (props: ReactProps) => <div></div>,
  TabButton: (props: ReactProps) => <div></div>,
  Required: () => <span className="after:text-red-500 after:content-['*']" />
}

export default function MDXComponent({ code }: Props) {
  const MDXContent = useMDXComponent(code)
  return (
    <div className="mdx">
      <MDXContent components={components} />
    </div>
  )
}
