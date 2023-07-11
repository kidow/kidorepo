declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    BLOB_READ_WRITE_TOKEN: string
    GOOGLE_ANALYTICS_PRIVATE_KEY: string
    GOOGLE_ANAYLTICS_PROJECT_ID: string
    GOOGLE_ANALYTICS_CLIENT_EMAIL: string
    GOOGLE_ANALYTICS_PROPERTY_ID: string
  }
}
