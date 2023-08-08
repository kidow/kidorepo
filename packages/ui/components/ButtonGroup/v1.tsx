export interface Props {
  list: string[]
  onClick: (key: number) => void
}

function ButtonGroup({ list, onClick }: Props) {
  return (
    <div className="inline-flex divide-x rounded border bg-white dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800">
      {list.map((name, key) => (
        <button
          className="hover:text-primary px-3 py-2 text-sm text-neutral-400 first:rounded-l last:rounded-r hover:bg-blue-50 dark:hover:bg-blue-200/30"
          key={key}
          onClick={() => onClick(key)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
