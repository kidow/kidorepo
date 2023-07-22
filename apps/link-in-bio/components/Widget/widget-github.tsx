'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Calendar from 'react-github-contribution-calendar'

import * as Icon from '@/components/icons'

import WidgetLink from './widget-link'

function WidgetGithub() {
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
      .catch((err) => console.error('github error', err))
  }, [])
  return (
    <WidgetLink
      className="col-span-2 xl:col-span-4 xl:hover:rotate-1"
      size="h-[178px] w-full xl:h-[175px] xl:w-[820px] hover:bg-neutral-50"
      href="https://github.com/kidow"
      icon={<Icon.Github />}
      title="Github"
      target="_blank"
      button={
        <button className="rounded-md border bg-slate-50 px-[21px] py-[7px] text-xs font-bold text-neutral-600">
          Follow
        </button>
      }
    >
      <Calendar
        values={data}
        until={dayjs().format('YYYY-MM-DD')}
        weekLabelAttributes={{}}
        monthLabelAttributes={{}}
        panelAttributes={{}}
        panelColors={['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']}
      />
    </WidgetLink>
  )
}

export default WidgetGithub
