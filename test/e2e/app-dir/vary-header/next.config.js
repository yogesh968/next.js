/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value: 'X-Foo',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
