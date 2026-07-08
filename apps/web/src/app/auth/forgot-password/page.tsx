import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RecoverPassword } from '@/http/recover-password'

export default function ForgotPasswordPage() {
  async function handleRecoverPassword(form: FormData) {
    'use server'

    const email = form.get('email') as string
    await RecoverPassword({ email })
  }

  return (
    <form action={handleRecoverPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Recover password
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Back to sign in</Link>
      </Button>
    </form>
  )
}
