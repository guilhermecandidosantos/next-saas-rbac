import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

import { SignInForm } from './sign-in-form'

export default async function SignInPage() {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return <SignInForm />
}
