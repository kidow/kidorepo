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
  const data = await props.promise
  return <SpotifyClient {...data} />
}
