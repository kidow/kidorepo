import type { FC } from 'react'
import { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Props extends VideoBlockObjectResponse {}

const Video: FC<Props> = (block) => {
  function getYouTubeVideoId(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

    const match = url.match(regExp)
    if (match && match[7].length === 11) {
      return match[7]
    } else {
      console.error('Invalid YouTube URL')
      return null
    }
  }

  if (block.video.type === 'external') {
    const youtubeId = getYouTubeVideoId(block.video.external.url)
    if (youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
          allowFullScreen
          className="pointer-events-auto h-full w-full"
        />
      )
    }
  }
  return <></>
}

export default Video
