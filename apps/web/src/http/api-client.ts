import { env } from '@saas/env'
import ky from 'ky'

export const api = ky.create({
  prefix: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  timeout: 350000,
  retry: {
    limit: 2,
    retryOnTimeout: true,
  },
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        let token: string | undefined

        if (typeof window !== 'undefined') {
          token = await fetch('/api/token')
            .then((res) => res.json())
            .then((data) => data.token)
        } else {
          const { cookies: getServerCookies } = await import('next/headers')
          const cookieStore = await getServerCookies()

          token = cookieStore.get('token')?.value
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
