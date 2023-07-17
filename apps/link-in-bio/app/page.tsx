import { type Metadata } from 'next'
import Image from 'next/image'
import {
  ArchiveIcon,
  FileTextIcon,
  MailIcon,
  StickyNoteIcon,
  UtensilsIcon
} from 'lucide-react'

import Github from '@/components/Github'
import * as Icon from '@/components/icons'
import Skills from '@/components/Skills'
import {
  WidgetAnalytics,
  WidgetLink,
  WidgetMap,
  WidgetQuote,
  WidgetScheduling,
  WidgetSpotify
} from '@/components/Widget'

const TITLE = 'Kidow'
const DESCRIPTION = '비즈니스에 관심이 많은 웹 개발자'
const BASE_URL = 'https://kidow.me'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Link in bio',
  generator: 'Next.js',
  keywords: [
    'kidow',
    'link-in-bio',
    'next.js',
    'bento.me',
    'resume',
    'blog',
    'google-analytics',
    'spotify',
    'google-calendar',
    'google-meet',
    'giphy',
    'github',
    'gmail',
    'kakao-map',
    'twitter',
    'linkedin',
    'gumroad',
    'buymeacoffee',
    'producthunt',
    'tistory',
    'disquiet',
    'memo'
  ],
  themeColor: '#dffc03',
  creator: 'kidow',
  publisher: 'Dongwook Kim',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    creator: '@__kidow__',
    card: 'summary_large_image'
  },
  verification: {
    google: 'dpMF3-oHfMYFVkjgJpIJSGM_W_aL_gSFFnmWHM90NHU',
    other: {
      'naver-site-verification': '6aad57e80bc0cb85f4d497fde9a243497dfa5a3d'
    }
  },
  category: 'Link-in-Bio',
  metadataBase: new URL(BASE_URL)
}

async function getData() {
  const res = await fetch(
    'https://api.bento.me/v1/urlrichdata/https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F5agjirffT0c86uuBbgLNDe',
    { next: { revalidate: 0 } }
  )
  const { data } = await res.json()
  return data
}

export default async function Page() {
  const data = await getData()
  return (
    <ul className="duration-400 grid grid-cols-2 gap-6 xl:grid-cols-4 xl:gap-10">
      <WidgetLink
        className="col-span-2 xl:col-span-4 xl:hover:rotate-1"
        size="h-[178px] w-full xl:h-[175px] xl:w-[820px] hover:bg-neutral-50"
        href="https://github.com/kidow"
        icon={<Icon.Github />}
        title="Github"
        target="_blank"
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
        href="/resume"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <FileTextIcon className="h-5 w-5" />
          </span>
        }
        title="Résumé"
        description="/resume"
      />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
        href="mailto:wcgo2ling@gmail.com"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <MailIcon className="h-5 w-5" />
          </span>
        }
        title="Gmail"
        description="wcgo2ling@gmail.com"
      />
      <WidgetMap />
      <li className="row-span-2 h-[178px] w-[178px] overflow-hidden rounded-3xl border border-neutral-200 shadow-sm xl:col-span-2 xl:h-[390px] xl:w-[390px]">
        <iframe
          src="https://giphy.com/embed/umYMU8G2ixG5mJBDo5"
          className="giphy-embed h-full w-full"
          allowFullScreen
        />
        <p>
          <a href="https://giphy.com/gifs/BoschGlobal-coding-home-office-remote-working-umYMU8G2ixG5mJBDo5">
            via GIPHY
          </a>
        </p>
      </li>
      <WidgetLink
        className="xl:col-span-2 xl:hover:rotate-1"
        size="w-full h-[178px] xl:h-[175px] xl:w-[380px] hover:bg-neutral-50"
        href="/blog"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1">
            <Image src="/blog.png" alt="blog" height={20} width={20} />
          </span>
        }
        title="Blog"
        description="이전 작업 중입니다."
      ></WidgetLink>
      <WidgetLink
        className="xl:hover:rotate-1"
        size="h-[178px] bg-[#F5FAFE] w-full xl:h-[175px] xl:w-[175px] hover:bg-[#F0F7FD]"
        href="https://twitter.com/__kidow__"
        icon={<Icon.Twitter />}
        title="Twitter"
        target="_blank"
        description="@__kidow__"
        button={
          <button className="flex items-center justify-center gap-1 rounded-full bg-[#55acee] px-4 py-[7px] text-xs hover:bg-[#4698d7]">
            <span className="font-bold text-white">Follow</span>
            <span className="text-blue-50"></span>
          </button>
        }
      />
      <WidgetSpotify {...data} />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
        href="https://kidow.gumroad.com"
        icon={<Icon.Gumroad />}
        target="_blank"
        title="Gumroad"
        description="kidow.gumroad.com"
      />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] bg-[#F0F6F9] xl:w-[175px] hover:bg-[#E9F4FA]"
        href="https://www.linkedin.com/in/kidow/"
        icon={<Icon.LinkedIn />}
        target="_blank"
        title="LinkedIn"
        description="/in/kidow"
      />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px] bg-[#FFFEF5] hover:bg-[#F6F4E2]"
        href="https://www.buymeacoffee.com/kidow"
        icon={<Icon.Buymeacoffee />}
        target="_blank"
        title="Buy me a coffee"
        description="/kidow"
      />
      <WidgetQuote />
      <WidgetScheduling />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px] hover:bg-neutral-50"
        href="https://www.producthunt.com/@kidow"
        icon={<Icon.ProductHunt />}
        target="_blank"
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
        target="_blank"
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
        target="_blank"
        title="Disquiet"
        description="@kidow"
      />
      <WidgetAnalytics />
      <li className="col-span-2 p-4 xl:col-span-4">
        <h3 className="px-2 font-semibold uppercase">Favorite Skills 🚀</h3>
      </li>
      <li className="col-span-2 xl:col-span-4">
        <Skills />
      </li>
      <li className="col-span-2 p-4 xl:col-span-4">
        <h3 className="px-2 font-semibold uppercase">Side Projects 👨🏻‍💻</h3>
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
        target="_blank"
        title="일간 ProductHunt"
      />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px]"
        href="/memo"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <StickyNoteIcon className="h-5 w-5" />
          </span>
        }
        title="MEMO"
        description="내용이 사라지지 않는"
      />
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px]"
        href="/lunch"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <UtensilsIcon className="h-5 w-5" />
          </span>
        }
        title="LUNCH"
        description="점심 뭐 먹지?"
      />
      {/* <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px]"
        href="/archive"
        target="_blank"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <Archive className="h-5 w-5" />
          </span>
        }
        title="ARCHIVE"
        description="개발 노하우 저장소"
      /> */}
    </ul>
  )
}
