'use client'

import Script from 'next/script'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

export default function WidgetMap() {
  const lat = 37.5744985
  const lng = 127.1926473
  return (
    <>
      <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c0986f45ad519044d2574ac8091cb572&libraries=services&autoload=false"
        async
        strategy="beforeInteractive"
      />
      <li className="relative col-span-2 row-span-2 h-[178px] w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-sm xl:h-[390px] xl:w-[390px]">
        <Map
          center={{ lat, lng }}
          className="h-full w-full"
          draggable={false}
          zoomable={false}
          level={9}
        >
          <MapMarker position={{ lat, lng }} />
        </Map>
        <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm">
          Hanam-si, Gyeonggi-do, South Korea
        </div>
      </li>
    </>
  )
}
