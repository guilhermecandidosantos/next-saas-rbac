import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookiesStore = await cookies()
  cookiesStore.get('token')

  return NextResponse.json({ token: cookiesStore.get('token')?.value ?? null })
}
