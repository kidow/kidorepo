import { NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import type { google } from '@google-analytics/data/build/protos/protos'
import dayjs from 'dayjs'

export async function GET(req: Request) {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: process.env.GOOGLE_ANAYLTICS_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(
        /\\n/gm,
        '\n'
      )
    }
  })
  const request: google.analytics.data.v1beta.IRunReportRequest = {
    property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
    orderBys: [{ dimension: { orderType: 'NUMERIC', dimensionName: 'date' } }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'screenPageViews' }],
    keepEmptyRows: false
  }
  const [[latestPageViews], [lastMonthPageViews], [totalPageViews]] =
    await Promise.all([
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD'),
            endDate: 'today'
          }
        ]
      }),
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: dayjs().add(-2, 'month').format('YYYY-MM-DD'),
            endDate: dayjs().add(-1, 'month').format('YYYY-MM-DD')
          }
        ]
      }),
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: '2001-01-01',
            endDate: 'today'
          }
        ]
      })
    ])
  const lastTotal = lastMonthPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  const latestTotal = latestPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  const percent = Number(
    (((latestTotal - lastTotal) / lastTotal) * 100).toFixed(1)
  )
  const total = totalPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  return NextResponse.json({
    percent,
    total,
    latestPageViews: latestPageViews.rows.map((item) => ({
      date: dayjs(item.dimensionValues[0].value).format('M월 D일'),
      '방문자 수': item.metricValues[0].value
    }))
  })
}
