/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily disable TypeScript build errors
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig 