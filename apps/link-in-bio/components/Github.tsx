'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Calendar from 'react-github-contribution-calendar'

export default function Github() {
  const [data, setData] = useState<Record<string, number>>({})
  useEffect(() => {
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
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
      .then((res) => res.json())
      .then((json) => {
        let result = {}
        for (const week of json?.data?.user?.contributionsCollection
          ?.contributionCalendar?.weeks) {
          for (const day of week.contributionDays) {
            result[day.date] = day.contributionCount
          }
        }
        setData(result)
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <Calendar
      values={data}
      until={dayjs().format('YYYY-MM-DD')}
      weekLabelAttributes={{}}
      monthLabelAttributes={{}}
      panelAttributes={{}}
      panelColors={['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']}
    />
  )
}
