declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    NEXT_PUBLIC_DISCORD_WEBHOOK_URL: string
  }
}
