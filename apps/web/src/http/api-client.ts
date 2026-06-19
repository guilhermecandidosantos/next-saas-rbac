import { env } from '@saas/env'
import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefix: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')

          cookieStore = cookies
        }

        const token = await getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
