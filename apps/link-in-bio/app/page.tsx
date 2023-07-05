import Image from 'next/image'
import Link from 'next/link'
import { Button, Header } from 'ui'

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex min-h-screen w-full max-w-[1728px] flex-col">
          <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
            <div className="flex h-full w-full max-w-[428px] items-center justify-center p-6 pb-0 pt-12 xl:absolute xl:top-0 xl:max-w-[min(100vw,1728px)] xl:items-stretch xl:justify-start xl:p-16">
              <div className="flex w-full flex-col px-4 xl:mr-20 xl:flex-1 xl:px-0">
                <div
                  className="relative xl:sticky xl:top-16"
                  style={{
                    opacity: 1,
                    transform: 'translate(0px, 0px)',
                    transition:
                      'opacity 1s cubic-bezier(0.42, 0, 0.25, 1) 0s, transform 1s cubic-bezier(0.2, 1.18, 0.47, 1) 0s'
                  }}
                >
                  <div
                    data-avatar="true"
                    className="h-[120px] w-[120px] xl:h-[184px] xl:w-[184px]"
                    style={{
                      transform: 'rotateZ(0deg)',
                      transition:
                        'transform 1s cubic-bezier(0.2, 1.18, 0.47, 1) 0s'
                    }}
                  >
                    <div className="relative aspect-square h-full w-full overflow-hidden rounded-full">
                      <Image
                        src="/avatar.png"
                        alt="avatar"
                        width={184}
                        height={184}
                        className="absolute left-0 top-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-2 mt-8 w-[calc(100%-8px)] max-w-[min(500px,100%-8px)] xl:max-w-[min(500px,calc(100vw_-_1000px))]">
                    <div className="text-[32px] font-bold leading-[120%] tracking-[-1px] xl:text-[44px] xl:tracking-[-2px]">
                      Kidow
                    </div>
                    <div className="mt-3 text-[#565656] xl:mt-3 xl:text-xl">
                      비즈니스에 관심이 많은 웹 개발자 ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full max-w-[428px] flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16">
              <div className="mb-10 flex flex-col px-4 xl:mb-0 xl:mr-20 xl:flex-1 xl:px-0"></div>
              <div className="relative flex-1 xl:w-[820px] xl:flex-none">
                <ul className="grid xl:grid-cols-4">grid</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="duration-400 fixed bottom-[52px] left-16 hidden select-none rounded-[12px] bg-white p-2 text-sm text-neutral-400 transition-colors delay-500 xl:block">
          <p>
            This project inspired by{' '}
            <Link
              href="https://bento.me"
              target="_blank"
              className="hover:underline"
            >
              Bento.me
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  )
}
