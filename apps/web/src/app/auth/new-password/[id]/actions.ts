'use server'

import { HTTPError } from 'ky'
import z from 'zod'

import { ResetPassword } from '@/http/reset-password'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters long.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match.',
  })

export async function resetPasswordAction(id: string, data: FormData) {
  const result = resetPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const error = JSON.parse(result.error.message).find(
      (err: { code: string; path: Array<string>; message: string }) =>
        err.code === 'custom',
    )

    return {
      success: false,
      message: String(error?.message),
      errors,
    }
  }

  const { password, confirmPassword } = result.data

  console.log('resetPasswordAction', { id, password, confirmPassword })

  try {
    await ResetPassword({
      code: id,
      password,
      confirmPassword,
    })

    return {
      success: true,
      message:
        'Password reset successfully. You can now log in with your new password.',
      errors: null,
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
}
