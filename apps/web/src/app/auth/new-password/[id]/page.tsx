'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hook/use-form-state'

import { resetPasswordAction } from './actions'

export default function ResetPasswordPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [formState, handleSubmit, isPending] = useFormState(
    resetPasswordAction.bind(null, id),
    async () => {
      router.push('/auth/sign-in')
    },
  )

  const { success, message, errors } = formState

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {success === false && errors && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Reset password failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2">
        {/* <div className="flex-1 space-y-1">
          <Label htmlFor="code">Code</Label>
          <Input
            name="code"
            type="code"
            id="code"
            defaultValue={id}
            value={id}
            disabled={!!id}
          />

          {errors?.code && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.code}
            </p>
          )}
        </div> */}

        <div className="flex-1 space-y-1">
          <Label htmlFor="password">New Password</Label>
          <Input name="password" type="password" id="password" />

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input name="confirmPassword" type="password" id="confirmPassword" />

          {errors?.confirmPassword && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="cursor-pointer" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Reset Password'
          )}
        </Button>
      </div>
    </form>
  )
}
