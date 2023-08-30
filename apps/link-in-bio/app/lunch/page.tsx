'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpRightIcon,
  ExternalLinkIcon,
  SearchIcon
} from 'lucide-react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { cn, toast } from 'utils'

const Board: string[][] = [
  [
    '찌개',
    '국밥',
    '고깃집',
    '족발,보쌈',
    '국수',
    '찜',
    '해물,생선',
    '쌈밥',
    '돈까스'
  ],
  ['짜장면', '짬뽕', '마라탕', '양꼬치', '훠궈', '', '', '', ''],
  [
    '초밥,스시',
    '라멘',
    '우동',
    '돈가츠',
    '오마카세',
    '샤브샤브',
    '텐동',
    '',
    ''
  ],
  ['파스타', '피자', '스테이크', '샐러드', '뷔페', '멕시칸,브라질', '', '', ''],
  [
    '한식',
    '중식',
    '일식',
    '양식',
    '혼밥',
    '아시아음식',
    '분식',
    '패스트푸드',
    '술집'
  ],
  ['베트남음식', '태국음식', '인도음식', '', '', '', '', '', ''],
  ['떡볶이', '김밥', '라면', '만두', '도시락', '', '', '', '편의점'],
  ['버거', '토스트', '샌드위치', '타코', '핫도그', '도넛', '빵', '카페', ''],
  ['치킨', '와인바', '포장마차', '파전', '', '', '', '', '']
]

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] =
    useState<kakao.maps.services.PlacesSearchResult>([])
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([])
  const [polylines, setPolylines] = useState<kakao.maps.Polyline[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [infoWindow, setInfoWindow] = useState<kakao.maps.InfoWindow | null>(
    null
  )
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [map, setMap] = useState<kakao.maps.Map>()

  const get = async (keyword: string, page: number = 1) => {
    map.setCenter(new kakao.maps.LatLng(latitude, longitude))
    const center = map?.getCenter()
    const places = new kakao.maps.services.Places()

    places.keywordSearch(
      keyword,
      (data, status, pagination) => {
        setTotal(pagination.totalCount)
        setHasNextPage(pagination.hasNextPage)
        if (!data.length) setResults([])
        if (page > 1) pagination.gotoPage(page)
        if (!data.length && !!results.length) {
          for (const i in results) {
            markers[i].setMap(null)
            polylines[i].setMap(null)
          }
        }
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds()
          const searchResult: kakao.maps.services.PlacesSearchResult = []
          if (!infoWindow) {
            setInfoWindow(
              new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
            )
          } else {
            infoWindow.close()
          }

          if (results.length) {
            for (const i in results) {
              markers[i].setMap(null)
              polylines[i].setMap(null)
            }
          }

          const searchMarkers: kakao.maps.Marker[] = []
          const searchPolylines: kakao.maps.Polyline[] = []

          for (const item of data) {
            searchResult.push(item)
            bounds.extend(new kakao.maps.LatLng(Number(item.y), Number(item.x)))

            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(Number(item.y), Number(item.x))
            })
            const points = [center, marker.getPosition()]
            const polyline = new kakao.maps.Polyline({
              path: points,
              strokeColor: 'black',
              strokeOpacity: 0.3
            })

            searchMarkers.push(marker)
            searchPolylines.push(polyline)

            polyline.setMap(map)
            marker.setMap(map)

            kakao.maps.event.addListener(marker, 'click', () => {
              infoWindow?.setContent(
                `<div style="color: black; padding: 2px;">${item.place_name}</div>`
              )
              infoWindow?.open(map, marker)
            })
          }

          setResults(page === 1 ? searchResult : [...results, ...searchResult])
          setMarkers(
            page === 1 ? searchMarkers : [...markers, ...searchMarkers]
          )
          setPolylines(
            page === 1 ? searchPolylines : [...polylines, ...searchPolylines]
          )
          setPage(pagination.current)

          map.setBounds(bounds)
        }
        map.setCenter(new kakao.maps.LatLng(latitude, longitude))
      },
      {
        location: center,
        sort: kakao.maps.services.SortBy.DISTANCE,
        radius: 500
      }
    )
  }

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchQuery) return
    if (e.keyCode === 13) get(searchQuery)
  }

  useEffect(() => {
    if (
      typeof window.navigator === 'undefined' ||
      typeof window.navigator.geolocation === 'undefined'
    ) {
      toast.warn('호환되지 않는 브라우저입니다.')
      return
    }

    if (!map) return

    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLatitude(latitude)
        setLongitude(longitude)
      }
    )
  }, [map])
  return (
    <>
      <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c0986f45ad519044d2574ac8091cb572&libraries=services&autoload=false"
        async
        strategy="beforeInteractive"
      />
      <h1 className="text-4xl font-extrabold">점심 뭐 먹지?</h1>
      <hr className="my-8" />
      <Map
        center={{ lat: latitude, lng: longitude }}
        onCreate={setMap}
        style={{ width: 820, height: 820 }}
      >
        {results.map((item, key) => (
          <MapMarker
            key={key}
            position={{ x: Number(item.x), y: Number(item.y) }}
          />
        ))}
      </Map>
      <div className="flex">
        <div className="grid flex-1 grid-cols-3 border-l border-t text-sm">
          {Board.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] grid-rows-[repeat(3,minmax(60px,1fr))] odd:bg-neutral-100"
            >
              {item.map((menu, j) => (
                <div
                  key={j}
                  onClick={() => {
                    if (!menu) return
                    setSearchQuery(menu)
                    get(menu)
                  }}
                  className={cn(
                    'relative border-b border-r p-1',
                    i % 2 === 0
                      ? 'hover:bg-neutral-200'
                      : 'hover:bg-neutral-100'
                  )}
                >
                  <button className="flex h-full w-full items-center justify-center">
                    {menu}
                  </button>
                  {i === 4 && (
                    <>
                      {j === 0 && (
                        <ArrowUpLeftIcon className="absolute left-0 top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                      )}
                      {j === 1 && (
                        <ArrowUpIcon className="absolute left-1/2 top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                      )}
                      {j === 2 && (
                        <ArrowUpRightIcon className="absolute right-0 top-0 z-10 h-5 w-5 -translate-y-1/2 translate-x-1/2 opacity-20" />
                      )}
                      {j === 3 && (
                        <ArrowLeftIcon className="absolute left-0 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                      )}
                      {j === 5 && (
                        <ArrowRightIcon className="absolute right-0 top-1/2 z-10 h-5 w-5 -translate-y-1/2 translate-x-1/2 opacity-20" />
                      )}
                      {j === 6 && (
                        <ArrowDownLeftIcon className="absolute bottom-0 left-0 z-10 h-5 w-5 -translate-x-1/2 translate-y-1/2 opacity-20" />
                      )}
                      {j === 7 && (
                        <ArrowDownIcon className="absolute bottom-0 left-1/2 z-10 h-5 w-5 -translate-x-1/2 translate-y-1/2 opacity-20" />
                      )}
                      {j === 8 && (
                        <ArrowDownRightIcon className="absolute bottom-0 right-0 z-10 h-5 w-5 translate-x-1/2 translate-y-1/2 opacity-20" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex w-60 flex-col divide-y border-y border-r">
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={onSearch}
              spellCheck={false}
              autoComplete="off"
              className="focus:outline-none"
              placeholder="검색"
            />
            <button disabled={!searchQuery} onClick={() => get(searchQuery)}>
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="flex h-10 items-center px-2 text-sm">
            총
            <span className={cn('ml-1', { 'font-semibold': total > 0 })}>
              {total}
            </span>
            개의 결과를 가져왔습니다.
          </p>
          <ul className="max-h-[450px] flex-1 overflow-auto overscroll-contain">
            {results.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer p-4 hover:bg-neutral-100"
                onClick={() => {
                  const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(
                      Number(item.y),
                      Number(item.x)
                    )
                  })
                  infoWindow?.close()
                  infoWindow?.setContent(
                    `<div style="color: black; padding: 2px;">${item.place_name}</div>`
                  )
                  infoWindow?.open(map, marker)
                  map.setCenter(
                    new kakao.maps.LatLng(Number(item.y), Number(item.x))
                  )
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    {item.place_name}
                  </span>
                  <div className="flex-1 text-sm text-neutral-400 dark:text-neutral-500">
                    {item.distance}m
                  </div>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-300">
                  {item.category_name}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <Link
                    href={item.place_url}
                    target="_blank"
                    className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {item.phone}
                  </span>
                </div>
              </li>
            ))}
            {hasNextPage && (
              <li
                className="cursor-pointer py-2 text-center text-sm dark:text-neutral-400 dark:hover:bg-neutral-800"
                onClick={() => get(searchQuery, page + 1)}
              >
                더 보기
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
