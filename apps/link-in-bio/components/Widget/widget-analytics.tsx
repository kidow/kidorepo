import { AreaChart, BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react'

export default async function WidgetAnalytics(props: {
  promise: Promise<{
    list: Array<{ date: string; '방문자 수': string }>
    percent: number
    total: number
  }>
}) {
  if (!props) return null
  try {
    const { list, percent, total } = await props.promise
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
  } catch (err) {
    console.log('analytics err: ', err)
    return null
  }
}
