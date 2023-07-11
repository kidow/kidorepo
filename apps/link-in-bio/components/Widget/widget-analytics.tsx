'use client'

import { useEffect, useState } from 'react'
import { AreaChart, BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react'

export default function WidgetAnalytics() {
  const [list, setList] = useState<
    Array<{ date: string; '방문자 수': number }>
  >([])
  const [percent, setPercent] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const get = async () => {
    const res = await fetch('/api/analytics')
    const data = await res.json()
    setList(data?.latestPageViews || [])
    setPercent(data?.percent || 0)
    setTotal(data?.total || 0)
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <li className="col-span-2">
      <Card className="shadow-none ring-neutral-200">
        <Text>총 방문자 수</Text>
        <Flex
          className="space-x-3 truncate"
          justifyContent="start"
          alignItems="baseline"
        >
          <Metric>{total.toLocaleString()}</Metric>
          <BadgeDelta
            deltaType={percent > 0 ? 'moderateIncrease' : 'moderateDecrease'}
          >
            {percent}%
          </BadgeDelta>
        </Flex>
        <AreaChart
          className="mt-6 h-28"
          data={list}
          index="date"
          valueFormatter={(number: number) =>
            Intl.NumberFormat('us').format(number).toString()
          }
          categories={['방문자 수']}
          colors={['blue']}
          showXAxis={true}
          showGridLines={false}
          startEndOnly={true}
          showYAxis={false}
          showLegend={false}
        />
      </Card>
    </li>
  )
}
