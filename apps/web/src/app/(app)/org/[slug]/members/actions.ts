'use server'

import { Role, rolesSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import z from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

const inviteSchema = z.object({
  email: z.email({ message: 'Please, provide a valid email address.' }),
  role: rolesSchema,
})

export async function createInviteAction(data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  const org = await getCurrentOrg()

  if (!org) {
    return {
      success: false,
      message: 'Organization not found.',
      errors: null,
    }
  }

  try {
    await createInvite({
      org,
      email,
      role,
    })

    revalidateTag(`${org}/invites`, 'max')

    return {
      success: true,
      message: 'Successfully sent invite.',
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = err.data
      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'An unexpected error occurred. Please, try again later.',
      errors: null,
    }
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`, 'max')
}

export async function updateMemberRoleAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`, 'max')
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`, 'max')
}
