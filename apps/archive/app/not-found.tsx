import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <Image
        src="https://illustrations.popsy.co/white/question-mark.svg"
        alt="404"
        height={288}
        width={288}
        priority
        className="mx-auto"
      />
      <h2 className="my-4 text-4xl font-bold">404 Not Found</h2>
    </div>
  )
}
