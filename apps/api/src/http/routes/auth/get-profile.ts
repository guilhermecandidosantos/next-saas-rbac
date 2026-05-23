import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Get user authentication profile',
        description: 'Get the profile of the currently authenticated user.',
        response: {
          200: z.object({
            user: z.object({
              id: z.uuid(),
              email: z.email(),
              name: z.string().nullable(),
              avatarUrl: z.url().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
        },
        where: { id: sub },
      })

      if (!user) {
        throw new BadRequestError('User not found')
      }

      return reply.status(200).send({ user })
    },
  )
}
