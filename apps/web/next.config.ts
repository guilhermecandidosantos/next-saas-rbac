import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:3333',
        'https://next-saas.guilhermecandidosantos.com.br',
      ],
    },
  },
}

export default nextConfig
