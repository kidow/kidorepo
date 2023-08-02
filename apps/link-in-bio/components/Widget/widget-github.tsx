import dayjs from 'dayjs'
import Calendar from 'react-github-contribution-calendar'

interface Props {
  promise: Promise<any>
}

export default async function WidgetGithub(props: Props) {
  if (!props) return null
  try {
    const data = await props.promise
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
  } catch (err) {
    console.log('github err: ', err)
    return null
  }
}
