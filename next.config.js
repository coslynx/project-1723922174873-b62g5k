/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.example.com'],
    loader: 'imgix',
  },
}

module.exports = nextConfig