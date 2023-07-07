import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: Request) {
  const data = await req.json()
  const authClient = new google.auth.OAuth2({
    clientId: '',
    clientSecret: '',
    redirectUri: ''
  })

  google.options({ auth: authClient })
  const calendar = google.calendar({ version: 'v3' })
  await calendar.events.insert({
    auth: authClient,
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: '새로운 화상 미팅 예약',
      description: data.memo,
      start: {
        dateTime: data.datetime,
        timeZone: 'Asia/Seoul'
      },
      end: {
        dateTime: '',
        timeZone: 'Asia/Seoul'
      },
      reminders: {
        useDefault: true
      }
    }
  })
  return NextResponse.json({})
}
