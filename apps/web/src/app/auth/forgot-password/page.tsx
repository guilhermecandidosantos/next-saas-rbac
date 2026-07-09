'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hook/use-form-state'

import { recoverPasswordAction } from './actions'

export default function ForgotPasswordPage() {
  const [formState, handleSubmit, isPending] = useFormState(
    recoverPasswordAction,
  )

  const { success, message, errors } = formState

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && errors && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Recover password failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Send recovery email'
        )}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Back to sign in</Link>
      </Button>
    </form>
  )
}
