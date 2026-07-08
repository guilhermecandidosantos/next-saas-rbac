'use server'

import { api } from './api-client'

interface ResetPasswordRequest {
  code: string
  password: string
  confirmPassword: string
}

type ResetPasswordResponse = void

export async function ResetPassword({
  code,
  password,
  confirmPassword,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  await api.post('/password/reset', {
    json: {
      code,
      password,
      confirmPassword,
    },
  })
}
