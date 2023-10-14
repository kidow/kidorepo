import { BetaAnalyticsDataClient } from '@google-analytics/data'
import type { google } from '@google-analytics/data/build/protos/protos'
import dayjs from 'dayjs'

export async function getAnalytics() {
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
            startDate: '2015-08-14',
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
  return {
    percent,
    total,
    list: latestPageViews.rows.map((item) => ({
      date: dayjs(item.dimensionValues[0].value).format('M월 D일'),
      '방문자 수': item.metricValues[0].value
    }))
  }
}

export async function getSpotify() {
  const res = await fetch(
    'https://api.bento.me/v1/urlrichdata/https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F5agjirffT0c86uuBbgLNDe',
    { next: { revalidate: 0 } }
  )
  if (!res.ok) {
    throw new Error('Error occurred when fetching spotify.')
  }
  const { data } = await res.json()
  return data
}

export async function getGithub() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }),
    body: JSON.stringify({
      query: `
          query($userName:String!) {
            user(login: $userName){
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
          `,
      variables: { userName: 'kidow' }
    })
  })
  if (!res.ok) {
    throw new Error('error occured when fetching github.')
  }
  const json = await res.json()
  const result = {}
  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      result[day.date] = day.contributionCount
    }
  }
  return result
}
