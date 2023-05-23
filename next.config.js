/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:nodeSlugs*/test2',
        destination: '/test/:nodeSlugs*?slug=test2',
      },
    ]
  }
}

module.exports = nextConfig
