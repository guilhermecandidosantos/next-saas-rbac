import type { NextConfig } from 'next'

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3333',
  'https://next-saas-web.guilhermecandidosantos.com.br',
  'https://next-saas-api.guilhermecandidosantos.com.br',
  process.env.PUBLIC_URL_APPLICATION,
].filter((origin): origin is string => Boolean(origin))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
}

export default nextConfig
