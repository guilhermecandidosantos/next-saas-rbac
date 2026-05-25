import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecovery(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recovery',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Request password recovery',
        description: 'Request a password recovery email.',
        body: z.object({
          email: z.email(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        return reply.status(201).send({})
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      // Send e-mail with passowrd recover link

      console.log('Password recovery code:', code)

      return reply.status(201).send({})
    },
  )
}
