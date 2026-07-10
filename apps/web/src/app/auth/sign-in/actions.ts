'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from 'process'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.email({ message: 'Please, provide a valid email address' }),
  password: z.string().min(1, { message: 'Please, provide a password' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email: String(email),
      password: String(password),
    })

    if (token) {
      const cookiesStore = await cookies()

      cookiesStore.set('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        ...(env.NODE_ENV === 'production' && {
          secure: true,
          sameSite: 'lax',
          domain: '.guilhermecandidosantos.com.br',
        }),
      })

      const inviteId = cookiesStore.get('inviteId')?.value

      if (inviteId) {
        try {
          await acceptInvite({ inviteId })
          cookiesStore.delete('inviteId')
        } catch (error) {}
      }
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = err.data
      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'An unexpected error occurred. Please, try again later.',
      errors: null,
    }
  }

  redirect('/')
}
