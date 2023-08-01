import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import type { google } from '@google-analytics/data/build/protos/protos'
import dayjs from 'dayjs'
import {
  ArchiveIcon,
  FileTextIcon,
  MailIcon,
  StickyNoteIcon,
  UtensilsIcon
} from 'lucide-react'

import * as Icon from '@/components/icons'
import Skills from '@/components/Skills'
import {
  WidgetAnalytics,
  WidgetGithub,
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

async function getAnalytics() {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: process.env.GOOGLE_ANAYLTICS_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(
        /\\n/gm,
        '\n'
      )
    }
  })
  const request: google.analytics.data.v1beta.IRunReportRequest = {
    property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
    orderBys: [{ dimension: { orderType: 'NUMERIC', dimensionName: 'date' } }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'screenPageViews' }],
    keepEmptyRows: false
  }
  const [[latestPageViews], [lastMonthPageViews], [totalPageViews]] =
    await Promise.all([
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD'),
            endDate: 'today'
          }
        ]
      }),
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: dayjs().add(-2, 'month').format('YYYY-MM-DD'),
            endDate: dayjs().add(-1, 'month').format('YYYY-MM-DD')
          }
        ]
      }),
      analyticsDataClient.runReport({
        ...request,
        dateRanges: [
          {
            startDate: '2001-01-01',
            endDate: 'today'
          }
        ]
      })
    ])
  const lastTotal = lastMonthPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  const latestTotal = latestPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  const percent = Number(
    (((latestTotal - lastTotal) / lastTotal) * 100).toFixed(1)
  )
  const total = totalPageViews.rows.reduce((acc, cur) => {
    acc += Number(cur.metricValues[0].value)
    return acc
  }, 0)
  return {
    percent,
    total,
    list: latestPageViews.rows.map((item) => ({
      date: dayjs(item.dimensionValues[0].value).format('M월 D일'),
      '방문자 수': item.metricValues[0].value
    }))
  }
}

async function getSpotify() {
  const res = await fetch(
    'https://api.bento.me/v1/urlrichdata/https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F5agjirffT0c86uuBbgLNDe',
    { next: { revalidate: 0 } }
  )
  if (!res.ok) {
    throw new Error('Error occurred when fetching spotify.')
  }
  const { data } = await res.json()
  return data
}

async function getGithub() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }),
    body: JSON.stringify({
      query: `
        query($userName:String!) {
          user(login: $userName){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
        `,
      variables: { userName: 'kidow' }
    })
  })
  if (!res.ok) {
    throw new Error('error occured when fetching github.')
  }
  const json = await res.json()
  let result = {}
  for (const week of json?.data?.user?.contributionsCollection
    ?.contributionCalendar?.weeks) {
    for (const day of week.contributionDays) {
      result[day.date] = day.contributionCount
    }
  }
  return result
}

export default async function Page() {
  const spotifyPromise = getSpotify()
  const analyticsPromise = getAnalytics()
  const githubPromise = getGithub()
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
        <Suspense fallback={null}>
          {/* @ts-expect-error Server Component */}
          <WidgetGithub promise={githubPromise} />
        </Suspense>
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
        size="w-full h-[178px] xl:h-[175px] xl:w-[390px] hover:bg-neutral-50"
        href="/blog"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border p-1">
            <Image src="/blog.png" alt="blog" height={20} width={20} />
          </span>
        }
        title="Blog"
        description="/blog"
      />
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
      <Suspense
        fallback={
          <li className="col-span-2 row-span-2">
            <div className="h-[390px] w-full rounded-3xl border border-neutral-200 bg-emerald-50 shadow-sm"></div>
          </li>
        }
      >
        {/* @ts-expect-error Server Component */}
        <WidgetSpotify promise={spotifyPromise} />
      </Suspense>
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
      <Suspense fallback={<li className="col-span-2" />}>
        {/* @ts-expect-error Server Component */}
        <WidgetAnalytics promise={analyticsPromise} />
      </Suspense>
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
      <WidgetLink
        className="xl:hover:rotate-2"
        size="h-[178px] w-full xl:h-[175px] xl:w-[175px]"
        href="/archive"
        target="_blank"
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border bg-white">
            <ArchiveIcon className="h-5 w-5" />
          </span>
        }
        title="ARCHIVE"
        description="(작업중)"
      />
    </ul>
  )
}
