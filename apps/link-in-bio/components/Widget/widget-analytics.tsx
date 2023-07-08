'use client'

import { AreaChart, BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react'

export default function WidgetAnalytics({}) {
  return (
    <li className="col-span-2">
      <Card className="shadow-none ring-neutral-200">
        <Text>총 방문자 수</Text>
        <Flex
          className="space-x-3 truncate"
          justifyContent="start"
          alignItems="baseline"
        >
          <Metric className="font-cal">170,418</Metric>
          <BadgeDelta deltaType="moderateIncrease">34.3%</BadgeDelta>
        </Flex>
        <AreaChart
          className="mt-6 h-28"
          data={[
            ...['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => ({
              Month: `${month} 23`,
              '총 방문자 수': 170418
            })),
            {
              Month: 'Jul 23',
              '총 방문자 수': 170418
            }
          ]}
          index="Month"
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat('us').format(number).toString()}`
          }
          categories={['총 방문자 수']}
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
