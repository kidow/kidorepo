declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    BASE_URL: string

    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string

    GOOGLE_ANALYTICS_PRIVATE_KEY: string
    GOOGLE_ANAYLTICS_PROJECT_ID: string
    GOOGLE_ANALYTICS_CLIENT_EMAIL: string
    GOOGLE_ANALYTICS_PROPERTY_ID: string

    GOOGLE_CALENDAR_REFRESH_TOKEN: string
    GOOGLE_CALENDAR_CLIENT_ID: string
    GOOGLE_CALENDAR_CLIENT_SECRET: string

    SLACK_WEBHOOK_URL: string

    NOTION_SECRET_KEY: string
    NOTION_DATABASE_ID: string

    GITHUB_TOKEN: string

    NEXT_PUBLIC_DISCORD_WEBHOOK_URL: string
  }
}
