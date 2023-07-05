'use client'

import { useEffect, useState } from 'react'
import Calendar from 'react-github-contribution-calendar'

export default function Github() {
  const [data, setData] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/kidow?y=last')
      .then((res) => res.json())
      .then((json) =>
        setData(
          json?.contributions.reduce((acc, cur) => {
            acc[cur.date] = cur.count
            return acc
          }, {})
        )
      )
      .catch((err) => console.error(err))
  }, [])
  return (
    <Calendar
      values={data}
      until="2023-07-05"
      weekLabelAttributes={{}}
      monthLabelAttributes={{}}
      panelAttributes={{}}
      panelColors={['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']}
    />
  )
}
