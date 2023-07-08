import { ChevronDown } from 'lucide-react'

interface Props extends ReactProps {}

export default function ResumeDetail({ children }: Props) {
  return (
    <button className="group block text-left focus:outline-none">
      <div className="inline-flex items-center gap-1">
        <span>주요 성과</span>
        <ChevronDown
          size={16}
          className="duration-150 group-focus:rotate-180"
        />
      </div>
      <ul className="hidden cursor-text select-text group-focus:block">
        {children}
      </ul>
    </button>
  )
}
