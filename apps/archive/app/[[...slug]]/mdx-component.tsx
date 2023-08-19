'use client'

import type { HTMLAttributes, ImgHTMLAttributes } from 'react'
import Link from 'next/link'
import { Icon } from '@/components'
import { BoxIcon, CopyIcon } from 'lucide-react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { cn, toast } from 'utils'

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
    <a
      className="font-medium underline underline-offset-4"
      target="_blank"
      {...props}
    />
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
    <img className="rounded-md" alt={props.alt} {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 dark:border-neutral-800 md:my-8" {...props} />
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
  pre: (props: HTMLAttributes<HTMLPreElement> & { __rawstring__: string }) => {
    return (
      <div className="group relative">
        <pre
          className="mb-4 overflow-x-auto rounded-b-lg border border-neutral-800 bg-[#1e293b] p-4 text-sm text-[#e2e8f0]"
          {...props}
        />
        {props.__rawstring__ && (
          <button
            onClick={() => {
              if (
                typeof window === 'undefined' ||
                typeof window.navigator === 'undefined'
              ) {
                toast.info('호환되지 않는 브라우저입니다.')
                return
              }

              window.navigator.clipboard
                .writeText(props.__rawstring__)
                .then(() => toast.success('복사되었습니다.'))
                .catch(() => toast.error('실패했습니다.'))
            }}
            className="group absolute right-3 top-3 hidden h-[30px] w-[30px] items-center justify-center rounded-md border border-neutral-600 bg-neutral-800 transition-all duration-150 group-hover:inline-flex"
            title="Copy code"
            tabIndex={0}
          >
            <span className="sr-only">Copy code</span>
            <CopyIcon size={16} className="text-neutral-400" />
          </button>
        )}
      </div>
    )
  },
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'hljs relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm first:ml-[-5px]',
        props.className
      )}
      {...props}
    />
  ),
  Callout: ({ children }: ReactProps) => (
    <div className="mt-6 flex items-center gap-2 rounded border bg-neutral-50 py-4 pl-3 pr-4 dark:border-neutral-800 dark:bg-neutral-900">
      <img src="/light-bulb.png" alt="bulb" className="h-6 w-6" />
      <div className="flex-1 [&>p]:!mt-0">{children}</div>
    </div>
  ),
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
  Required: () => <span className="after:text-red-500 after:content-['*']" />,
  Blocks: ({ children }: ReactProps) => (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  ),
  LinkBlock: ({
    slug,
    icon,
    name
  }: {
    slug: string
    icon: 'components' | 'hooks' | 'utils'
    name: string
  }) => (
    <Link
      className="group flex items-center justify-start gap-2 rounded-lg border border-gray-200 bg-transparent p-4 text-gray-700 shadow-sm shadow-gray-100 transition-all duration-200 hover:border-gray-300 hover:bg-slate-50 hover:text-gray-900 hover:shadow-md hover:shadow-gray-100 active:shadow-sm active:shadow-gray-200 dark:border-neutral-800 dark:text-neutral-200 dark:shadow-none dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-neutral-50 dark:hover:shadow-none"
      href={slug}
    >
      {icon === 'components' && (
        <BoxIcon className="h-6 w-6 text-neutral-400 duration-200 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-50" />
      )}
      {icon === 'hooks' && (
        <Icon.Hook className="h-6 w-6 text-neutral-400 duration-200 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-50" />
      )}
      {icon === 'utils' && (
        <Icon.Wrench className="h-6 w-6 text-neutral-400 duration-200 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-50" />
      )}
      <span className="font-semibold">{name}</span>
    </Link>
  ),
  Storybook: ({ url }: { url: string }) => (
    <>
      <iframe
        src={`${url}&viewMode=story&shortcuts=false&singleStory=true&full=1`}
        className="mt-6 hidden md:block"
        width="800"
        height="440"
        allowFullScreen
      />
      <p className="mt-2 md:hidden">It can only be viewed in a mobile.</p>
    </>
  )
}

export default function MDXComponent({ code }: Props) {
  const MDXContent = useMDXComponent(code)
  return (
    <div className="mdx mt-6">
      <MDXContent components={components} />
    </div>
  )
}
