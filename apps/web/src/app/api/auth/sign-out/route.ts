import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  const cookiesStore = await cookies()

  cookiesStore.set('token', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
    ...(process.env.NODE_ENV === 'production' && {
      secure: true,
      sameSite: 'lax',
    }),
  })

  cookiesStore.set('token', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
    ...(process.env.NODE_ENV === 'production' && {
      secure: true,
      sameSite: 'lax',
      domain: '.guilhermecandidosantos.com.br',
    }),
  })

  return NextResponse.redirect(redirectUrl)
}
