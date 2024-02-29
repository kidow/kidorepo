import { memo } from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="duration-400 fixed bottom-[52px] left-16 hidden select-none rounded-[12px] bg-white p-2 text-sm text-neutral-400 transition-colors delay-500 [view-transition-name:footer] xl:block">
      <p>
        This project inspired by{' '}
        <Link
          href="https://bento.me/?ref=dongwook.kim"
          target="_blank"
          className="hover:underline"
        >
          Bento.me
        </Link>
        .
      </p>
    </footer>
  )
}

export default memo(Footer)
