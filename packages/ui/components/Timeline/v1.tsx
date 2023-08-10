import { memo } from 'react'

export interface Props {
  date: string
  title: string
  content?: string
}

function Timeline({ date, title, content }: Props) {
  return (
    <li className='relative -top-2 flex flex-col gap-5 pb-10 pl-5 before:absolute before:-bottom-2 before:left-0 before:top-2 before:border-r before:border-dashed before:border-neutral-500 before:content-[""] after:absolute after:left-[-5px] after:top-1.5 after:z-10 after:h-3 after:w-3 after:rounded-full after:border-2 after:border-blue-500 after:bg-neutral-50 after:content-[""] last:pb-0 after:dark:bg-neutral-950 sm:flex-row'>
      <div className="select-none whitespace-nowrap font-semibold text-neutral-900 dark:text-neutral-50">
        {date}
      </div>
      <section>
        <h3 className="text-lg font-medium">{title}</h3>
        {!!content && <div className="mt-1.5 text-neutral-500">{content}</div>}
      </section>
    </li>
  )
}

export default memo(Timeline)
