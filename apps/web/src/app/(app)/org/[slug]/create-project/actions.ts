'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const projectSchema = z.object({
  name: z.string().min(4, {
    message: 'Project name must be at least 4 characters long',
  }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = result.data

  const org = await getCurrentOrg()

  if (!org) {
    return {
      success: false,
      message: 'Organization not found.',
      errors: null,
    }
  }

  try {
    await createProject({
      org,
      name: String(name),
      description: String(description),
    })

    return {
      success: true,
      message: 'Successfully saved project.',
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
