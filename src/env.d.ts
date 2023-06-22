/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly API_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
