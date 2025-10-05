/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    transpilePackages: ['@entrepreneur-ai/schemas'],
}

module.exports = nextConfig


