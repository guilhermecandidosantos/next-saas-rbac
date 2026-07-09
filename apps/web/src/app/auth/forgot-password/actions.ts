import { RecoverPassword } from '@/http/recover-password'

interface RecoverPasswordResponse {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export async function recoverPasswordAction(
  form: FormData,
): Promise<RecoverPasswordResponse> {
  const email = form.get('email') as string

  if (email.trim() === '') {
    return {
      success: false,
      message: 'Email is required',
      errors: { email: ['Email is required'] },
    }
  }

  try {
    await RecoverPassword({ email })

    return {
      success: true,
      message: 'Password recovery email sent successfully',
      errors: null,
    }
  } catch (error) {
    return {
      success: false,
      message:
        'Failed to send password recovery email' +
        (error instanceof Error ? `: ${error.message}` : ''),
      errors: {
        error: [
          'Failed to send password recovery email: ' +
            (error instanceof Error ? error.message : String(error)),
        ],
      },
    }
  }

  return {
    success: false,
    message: null,
    errors: null,
  }
}
