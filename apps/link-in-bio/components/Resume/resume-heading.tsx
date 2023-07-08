import Link from 'next/link'

interface Props {
  id: string
  title: string
}

export default function ResumeHeading({ id, title }: Props) {
  return (
    <Link href={`/resume#${id}`} className="!no-underline hover:!underline">
      <h2 id={id}>{title}</h2>
    </Link>
  )
}
