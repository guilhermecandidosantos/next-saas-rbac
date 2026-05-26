import { env } from '@saas/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with GitHub',
        description: 'Authenticate with GitHub and receive a session token.',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )
      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET,
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CALLBACK_URL,
      )
      githubOAuthURL.searchParams.set('scope', 'read:user,user:email')
      githubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenResponseData =
        await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenResponseData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      const githubUserResponseData = await githubUserResponse.json()

      let email: string = ''

      const {
        id: githubId,
        avatar_url: avatarUrl,
        name,
        email: emailFromGitHub,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.url(),
          name: z.string().nullable(),
          email: z.email().nullable(),
        })
        .parse(githubUserResponseData)

      if (emailFromGitHub === null) {
        const githubEmailResponse = await fetch(
          'https://api.github.com/user/emails',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
            },
          },
        )

        const githubEmailResponseData = await githubEmailResponse.json()

        type PrivatesEmailResponse = {
          email: string
          primary: boolean
        }

        const { email: privateEmail } = z
          .object({
            email: z.email(),
          })
          .parse(
            githubEmailResponseData.find(
              (privateEmails: PrivatesEmailResponse) => privateEmails.primary,
            ),
          )

        if (!privateEmail) {
          throw new BadRequestError(
            'Your GitHub account does not have an email associated. Please add an email to your GitHub account and try again.',
          )
        } else {
          email = privateEmail
        }
      } else {
        email = emailFromGitHub
      }

      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
