import { Button, Card, Textarea } from '@tremor/react'
import { useObjectState } from 'hooks'

interface State {
  value: string
  isLoading: boolean
}

export default function WidgetDM() {
  const [{ value, isLoading }, setState, onChange] = useObjectState<State>({
    value: '',
    isLoading: false
  })

  const onSubmit = async () => {
    if (!value || isLoading) return
    setState({ isLoading: true })
    await fetch(
      'https://discord.com/api/webhooks/1141695318375809074/NBwaR2RhE1UX8IjGHChR3vV_NHeVUQbvS4G2p5ibJ9Rb5hW_tndgrLTHOoj-8xVjnCuM',
      {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ content: `[DM] ${value}` })
      }
    )
    setState({ isLoading: false, value: '' })
  }
  return (
    <li className="col-span-2">
      <Card className="flex h-60 flex-col space-y-6 shadow-none ring-neutral-200">
        <Textarea
          className="flex-1 resize-none"
          placeholder="제게 할 말이 있다면 DM을 보내보세요. 익명이 보장됩니다."
          value={value}
          name="value"
          onChange={onChange}
        />
        <div className="flex justify-end">
          <Button loading={isLoading} disabled={!value} onClick={onSubmit}>
            전달
          </Button>
        </div>
      </Card>
    </li>
  )
}
