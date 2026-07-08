'use server'

import { api } from './api-client'

interface RecoverPasswordRequest {
  email: string
}

type RecoverPasswordResponse = {
  code: string
}

export async function RecoverPassword({
  email,
}: RecoverPasswordRequest): Promise<RecoverPasswordResponse> {
  const result = await api
    .post('/password/recovery', {
      json: {
        email,
      },
    })
    .json<RecoverPasswordResponse>()

  return result
}
