'use client'

import Link from 'next/link'

import * as Icon from '@/components/icons'

function WidgetSpotify() {
  const onPlay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }
  return (
    <li className="col-span-2 row-span-2 overflow-hidden">
      <Link
        href="https://open.spotify.com"
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        className="flex h-[390px] w-full flex-col items-start rounded-3xl border border-neutral-200 bg-emerald-50 p-5 shadow-sm duration-150 xl:w-[390px] xl:p-6"
      >
        <div className="flex w-full flex-1 flex-col items-start">
          <div className="flex w-full items-start justify-between">
            <Icon.Spotify />
            <button
              onClick={onPlay}
              className="xs:px-[16px] flex min-w-[86px] items-center justify-center gap-1 rounded-[18px] bg-[#1ED760] px-[10px] py-[7px] text-center text-xs font-bold text-white transition-transform will-change-transform hover:bg-[#1fdf64] active:scale-[0.95] active:bg-[#169c46] active:text-white/80"
            >
              <span className="pointer-events-auto flex flex-row items-center gap-1.5">
                <svg
                  width="12"
                  height="12"
                  className="inline text-white"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13.1231V2.87688C3 1.42024 4.55203 0.520516 5.77196 1.26995L14.1114 6.39307C15.2962 7.12093 15.2962 8.87907 14.1114 9.60693L5.77196 14.73C4.55203 15.4795 3 14.5798 3 13.1231Z"
                    fill="white"
                  ></path>
                </svg>
                <span>Play</span>
              </span>
            </button>
          </div>
          <div className="mt-3 flex-1">
            <div className="text-sm uppercase">Spotify</div>
            <p className="mt-1 text-xs text-neutral-400">304 songs</p>
          </div>
        </div>
        <ul className="w-full">
          {Array.from({ length: 4 }).map((_, key) => (
            <li className="group" key={key}>
              <button className="group flex w-full flex-row items-center justify-between py-2 transition-transform duration-150 active:scale-[0.995] group-last:pb-0">
                <div className="flex flex-row items-center">
                  <div className="relative h-[40px] w-[40px] flex-none transition-all group-hover:rounded-full">
                    <div className="absolute inset-0 z-20 hidden h-full w-full appearance-none items-center justify-center rounded-full bg-[#1ED760] transition-all duration-150 ease-in hover:bg-[#12CE55] active:bg-[#07BB47] group-hover:flex group-hover:opacity-100">
                      <svg
                        width="12"
                        height="12"
                        className="text-white"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 13.1231V2.87688C3 1.42024 4.55203 0.520516 5.77196 1.26995L14.1114 6.39307C15.2962 7.12093 15.2962 8.87907 14.1114 9.60693L5.77196 14.73C4.55203 15.4795 3 14.5798 3 13.1231Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                    <div className="relative rounded-[6px]">
                      <img
                        src="https://i.pravatar.cc"
                        loading="lazy"
                        className="pointer-events-auto z-10 h-full w-full rounded-[inherit] border-black/[0.08] object-cover transition-all ease-in group-hover:hidden"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mx-3 flex flex-col text-left">
                    <div className="line-clamp-1 text-sm">TITLE</div>
                    <div className="pointer-events-auto line-clamp-1 text-xs text-black/60">
                      artist
                    </div>
                  </div>
                </div>
                <div className="w-fit flex-none text-sm tabular-nums text-black/40">
                  3:20
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Link>
    </li>
  )
}

export default WidgetSpotify
