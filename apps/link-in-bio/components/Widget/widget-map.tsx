'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'

function WidgetMap({}) {
  return (
    <li className="relative col-span-2 row-span-2 h-[178px] w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-sm xl:h-[390px] xl:w-[390px]">
      <Map
        center={{ lat: 37.5763199, lng: 127.1882883 }}
        className="h-full w-full"
        draggable={false}
        zoomable={false}
        level={9}
      >
        <MapMarker position={{ lat: 37.5763199, lng: 127.1882883 }}></MapMarker>
      </Map>
      <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm">
        Hanam-si, Gyeonggi-do, South Korea
      </div>
    </li>
  )
}

export default WidgetMap
