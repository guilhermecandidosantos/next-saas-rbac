import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.url(),

    JWT_SECRET: z.string(),

    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_CALLBACK_URL: z.url(),

    HOST_EMAIL: z.string(),
    USER_EMAIL: z.string(),
    PASSWORD_EMAIL: z.string(),
    PORT_EMAIL: z.coerce.number().default(465),
    SECURE_EMAIL: z.coerce.boolean().default(true),
    PUBLIC_URL_APPLICATION: z.url(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: {
    PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CALLBACK_URL: process.env.GITHUB_OAUTH_CALLBACK_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    PUBLIC_URL_APPLICATION: process.env.PUBLIC_URL_APPLICATION,
    HOST_EMAIL: process.env.HOST_EMAIL,
    USER_EMAIL: process.env.USER_EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL,
    PORT_EMAIL: process.env.PORT_EMAIL,
    SECURE_EMAIL: process.env.SECURE_EMAIL,
  },
  emptyStringAsUndefined: true,
  // Pula a validação durante o build do Next.js
  // As variáveis server-side só são necessárias em runtime
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'build',
})
