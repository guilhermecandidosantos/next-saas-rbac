import { env } from '@saas/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
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
          201: z.object({
            code: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        return reply.status(400).send({
          message: 'User not found',
        })
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      // Send e-mail with passowrd recover link

      const {
        HOST_EMAIL: hostEmail,
        PORT_EMAIL: portEmail,
        SECURE_EMAIL: secureEmail,
        USER_EMAIL: userEmail,
        PASSWORD_EMAIL: passwordEmail,
        PUBLIC_URL_APPLICATION: publicUrlApplication,
      } = env

      console.info(
        'Configuring email transporter with the following settings:',
        {
          host: hostEmail,
          port: portEmail,
          secure: secureEmail,
          user: userEmail,
          password: passwordEmail,
        },
      )

      const transporter = nodemailer.createTransport({
        host: hostEmail,
        port: portEmail,
        secure: secureEmail,
        auth: {
          user: userEmail,
          pass: passwordEmail,
        },
      })

      try {
        await transporter.verify()
      } catch (error) {
        return reply.status(400).send({
          message:
            'Error verifying email transporter' + (error as Error).message,
        })
      }

      await transporter.sendMail({
        from: userEmail,
        to: email,
        subject: 'Password Recovery',
        text: `Hello, your link to reset your password is: ${publicUrlApplication}/auth/new-password/${code}`,
      })

      return reply.status(201).send({ code })
    },
  )
}
