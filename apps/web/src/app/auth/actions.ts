'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')
  githubSignInUrl.searchParams.set('client_id', 'Ov23liWzOXSHhk54cAx6')
  githubSignInUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSignInUrl.searchParams.set('scope', 'read:user user:email')

  redirect(githubSignInUrl.toString())
}
