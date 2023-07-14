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
        <div className="flex">
          <div className="relative flex-grow overflow-hidden">
            <div className="relative cursor-pointer">
              <div className="relative">
                <div className="pointer-events-none block w-full">
                  <div className="relative flex h-0 min-h-[100px] w-full justify-center pb-[56.25%]">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <div className="h-full w-full">
                        <div className="pointer-events-auto absolute left-0 top-0 h-full w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                            allowFullScreen
                            className="pointer-events-auto absolute left-0 top-0 h-full w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return <></>
}

export default Video
