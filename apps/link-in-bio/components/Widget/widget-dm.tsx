'use client'

import { useMemo } from 'react'
import { Button, Card, Textarea } from '@tremor/react'
import { useObjectState } from 'hooks'
import { cn } from 'utils'

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
    await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ content: `[DM] ${value}` })
    })
    setState({ isLoading: false, value: '' })
  }

  const isHashDM: boolean = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.location.hash === '#dm'
  }, [])

  return (
    <li className="col-span-2" id="dm">
      <Card
        className={cn(
          'flex h-60 flex-col space-y-6 shadow-none ring-neutral-200',
          { 'ring ring-blue-200 ring-offset-2': isHashDM }
        )}
      >
        <Textarea
          className="flex-1 resize-none"
          placeholder="제게 할 말이 있다면 DM을 보내보세요. 익명이 보장됩니다."
          value={value}
          name="value"
          autoFocus={isHashDM}
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
