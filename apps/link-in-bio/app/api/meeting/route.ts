import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { z } from 'zod'

export async function POST(req: Request) {
  const body = z.object({
    name: z.string(),
    email: z.string().email(),
    memo: z.string(),
    datetime: z.string().datetime(),
    additionalEmail: z.string().optional()
  })
  const { name, email, memo, datetime, additionalEmail } = body.parse(
    await req.json()
  )

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET
  )
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN
  })

  const calendar = google.calendar({ version: 'v3', auth })
  const result = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `${name}님과 김동욱님: 30분 미팅`,
      description: `예약자 이름: ${name}\n예약자 이메일: ${email}\n남기는 메모:\n${memo}`,
      start: {
        dateTime: datetime,
        timeZone: 'Asia/Seoul'
      },
      end: {
        dateTime: dayjs(datetime).add(30, 'minute').toISOString(),
        timeZone: 'Asia/Seoul'
      },
      reminders: {
        useDefault: true
      },
      attendees: [
        { email: 'wcgo2ling@gmail.com', displayName: '김동욱' },
        { email, displayName: name },
        ...(additionalEmail
          ? additionalEmail.split(', ').map((email) => ({ email }))
          : [])
      ],
      conferenceData: {
        createRequest: {
          requestId: 'link-in-bio',
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    }
  })
  return NextResponse.json({ result, success: true })
}
