'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'
import { getMembership } from '@/http/get-membership'
import { defineAbilitiesFor } from '@saas/auth'

export async function isAuthenticated() {
  const cookiesStore = await cookies()

  return cookiesStore.get('token')?.value
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()
  return cookieStore.get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const {membership} = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilitiesFor({
    id: membership.id,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const cookiesStore = await cookies()

  const token = cookiesStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    cookiesStore.delete('token')
  }

  redirect('/auth/sign-in')
}
