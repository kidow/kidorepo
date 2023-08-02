import SpotifyClient from './client'

interface Props {
  promise: Promise<{
    tracks: Array<{
      title: string
      artists: string[]
      duration: number
      thumbnail: string
      audioSnippet: string
    }>
    totalSongs: number
  }>
}

export default async function SpotifyServer(props: Props) {
  if (!props) return null
  try {
    const data = await props.promise
    return <SpotifyClient {...data} />
  } catch (err) {
    console.error('spotify err: ', err)
    return (
      <li className="col-span-2 row-span-2 overflow-hidden">
        <div className="flex h-[390px] w-full rounded-3xl border border-neutral-200 bg-emerald-50 shadow-sm" />
      </li>
    )
  }
}
