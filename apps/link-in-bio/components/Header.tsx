'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'utils'

function Header() {
  const pathname = usePathname()
  return (
    <header
      className={cn(
        'flex h-full w-full max-w-[428px] items-center justify-center p-6 pb-0 pt-12 [view-transition-name:header] xl:absolute xl:top-0 xl:max-w-[min(100vw,1728px)] xl:items-stretch xl:justify-start xl:p-16',
        { 'hidden xl:block': pathname?.startsWith('/blog/') }
      )}
    >
      <div className="flex w-full flex-col px-4 xl:mr-20 xl:flex-1 xl:px-0">
        <div
          className="relative xl:sticky xl:top-16"
          style={{
            transition:
              'opacity 1s cubic-bezier(0.42, 0, 0.25, 1) 0s, transform 1s cubic-bezier(0.2, 1.18, 0.47, 1) 0s'
          }}
        >
          <div
            className="h-[120px] w-[120px] xl:h-[184px] xl:w-[184px]"
            style={{
              transform: 'rotateZ(0deg)',
              transition: 'transform 1s cubic-bezier(0.2, 1.18, 0.47, 1) 0s'
            }}
          >
            <div className="ring-primary relative aspect-square h-full w-full overflow-hidden rounded-full ring-offset-2 duration-300 hover:ring">
              <Link href="/">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  priority
                  width={184}
                  height={184}
                  className="absolute left-0 top-0 h-full w-full object-cover [view-transition-name:header-avatar]"
                  draggable={false}
                />
              </Link>
            </div>
          </div>
          <div className="ml-2 mt-8 w-[calc(100%-8px)] max-w-[min(500px,100%-8px)] xl:max-w-[min(500px,calc(100vw_-_1000px))]">
            <div className="text-[32px] font-bold leading-[120%] tracking-[-1px] [view-transition-name:header-title] xl:text-[44px] xl:tracking-[-2px]">
              Kidow
            </div>
            <div className="mt-3 text-[#565656] [view-transition-name:header-description] xl:mt-3 xl:text-xl">
              비즈니스에 관심이 많은 웹 개발자 ✨
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
