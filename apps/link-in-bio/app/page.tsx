import Image from 'next/image'

import Footer from '@/components/Footer'
import Github from '@/components/Github'
import Header from '@/components/Header'
import * as Icon from '@/components/icons'
import Skills from '@/components/Skills'
import {
  WidgetLink,
  WidgetMap,
  WidgetQuote,
  WidgetScheduling,
  WidgetSpotify
} from '@/components/Widget'

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex min-h-screen w-full max-w-[1728px] flex-col">
          <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
            <Header />
            <div className="flex h-full w-full max-w-[428px] flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16">
              <div className="mb-10 flex flex-col px-4 xl:mb-0 xl:mr-20 xl:flex-1 xl:px-0" />
              <div className="relative flex-1 xl:w-[820px] xl:flex-none">
                <ul className="duration-400 grid grid-cols-2 gap-6 xl:grid-cols-4 xl:gap-10">
                  <WidgetLink
                    className="col-span-2 xl:col-span-4 xl:hover:rotate-1"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[820px] hover:bg-neutral-50"
                    href="https://github.com/kidow"
                    icon={<Icon.Github />}
                    title="Github"
                    button={
                      <button className="rounded-md border bg-slate-50 px-[21px] py-[7px] text-xs font-bold text-neutral-600">
                        Follow
                      </button>
                    }
                  >
                    <Github />
                  </WidgetLink>
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="https://resume.kidow.me"
                    icon={<Icon.Resume />}
                    title="Resume"
                    description="resume.kidow.me"
                  />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="mailto:wcgo2ling@gmail.com"
                    icon={<Icon.Email />}
                    title="Gmail"
                    description="wcgo2ling@gmail.com"
                  />
                  <WidgetMap />
                  <li className="row-span-2 h-[178px] w-[178px] overflow-hidden rounded-3xl border border-neutral-200 shadow-sm xl:col-span-2 xl:h-[390px] xl:w-[390px]">
                    <iframe
                      src="https://giphy.com/embed/umYMU8G2ixG5mJBDo5"
                      className="giphy-embed h-full w-full"
                      allowFullScreen
                    ></iframe>
                    <p>
                      <a href="https://giphy.com/gifs/BoschGlobal-coding-home-office-remote-working-umYMU8G2ixG5mJBDo5">
                        via GIPHY
                      </a>
                    </p>
                  </li>
                  <WidgetLink
                    className="xl:col-span-2 xl:hover:rotate-1"
                    size="w-full h-[178px] xl:h-[175px] xl:w-[380px] hover:bg-neutral-50"
                    href="https://blog.kidow.me"
                    icon={
                      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1">
                        <Image
                          src="/blog.png"
                          alt="blog"
                          height={20}
                          width={20}
                        />
                      </span>
                    }
                    title="Blog"
                    description="blog.kidow.me"
                  >
                    <img
                      src="https://daily-producthunt.kidow.me/opengraph-image.png?c7b23718c68e315c"
                      alt=""
                      className="hidden h-full w-full rounded-[10px] border xl:block"
                    />
                  </WidgetLink>
                  <WidgetLink
                    className="xl:hover:rotate-1"
                    size="h-[178px] bg-[#F5FAFE] w-full xl:h-[175px] xl:w-[175px] hover:bg-[#F0F7FD]"
                    href="https://twitter.com/__kidow__"
                    icon={<Icon.Twitter />}
                    title="Twitter"
                    description="@__kidow__"
                    button={
                      <button className="flex items-center justify-center gap-1 rounded-full bg-[#55acee] px-4 py-[7px] text-xs hover:bg-[#4698d7]">
                        <span className="font-bold text-white">Follow</span>
                        <span className="text-blue-50"></span>
                      </button>
                    }
                  />
                  <WidgetSpotify />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="https://kidow.gumroad.com"
                    icon={<Icon.Gumroad />}
                    title="Gumroad"
                  />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] bg-[#F0F6F9] xl:w-[175px] hover:bg-[#E9F4FA]"
                    href="https://www.linkedin.com/in/kidow/"
                    icon={<Icon.LinkedIn />}
                    title="LinkedIn"
                  />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] bg-[#FFFEF5] hover:bg-[#F6F4E2]"
                    href="https://www.buymeacoffee.com/kidow"
                    icon={<Icon.Buymeacoffee />}
                    title="Buy me a coffee"
                  />
                  <WidgetQuote />
                  <WidgetScheduling />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="https://www.producthunt.com/@kidow"
                    icon={<Icon.ProductHunt />}
                    title="ProductHunt"
                    description="@kidow"
                    button={
                      <button className="rounded-lg border border-[#ED6B5C] bg-[#ED6B5C] px-[21px] py-[7px] text-xs font-bold text-neutral-50">
                        Follow
                      </button>
                    }
                  />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="https://wcgo2ling.tistory.com"
                    icon={
                      <Image
                        src="/tistory.png"
                        alt="tistory"
                        height={40}
                        width={40}
                        className="rounded-[10px] border"
                      />
                    }
                    title="Tistory"
                    description="wcgo2ling"
                  />
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
                    href="https://disquiet.io/@kidow"
                    icon={
                      <Image
                        src="/disquiet.png"
                        alt="disquiet"
                        height={40}
                        width={40}
                        className="rounded-[10px] border"
                      />
                    }
                    title="Disquiet"
                    description="@kidow"
                  />
                  <li className="col-span-2 p-4 xl:col-span-4">
                    <h3 className="px-2 font-semibold uppercase">
                      Favorite Skills 🚀
                    </h3>
                  </li>
                  <li className="col-span-2 xl:col-span-4">
                    <Skills />
                  </li>
                  <li className="col-span-2 p-4 xl:col-span-4">
                    <h3 className="px-2 font-semibold uppercase">
                      Side Projects 👨🏻‍💻
                    </h3>
                  </li>
                  <WidgetLink
                    className="xl:hover:rotate-2"
                    size="h-[178px] w-full xl:h-[175px] xl:w-[175px]"
                    href="https://daily-producthunt.kidow.me"
                    icon={
                      <Image
                        src="/daily-producthunt.png"
                        alt="daily-producthunt"
                        height={40}
                        width={40}
                        className="rounded-[10px]"
                      />
                    }
                    title="일간 ProductHunt"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
