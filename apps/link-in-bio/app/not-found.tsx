import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center">
      <Image
        src="https://illustrations.popsy.co/white/question-mark.svg"
        alt="404"
        height={288}
        width={288}
        priority
        className="mx-auto"
      />
      <h2 className="my-4 text-4xl font-bold">404 Not Found</h2>
      <Link href="/">
        <button className="select-none rounded-[10px] border px-3 py-2 text-neutral-700">
          홈
        </button>
      </Link>
    </div>
  )
}
