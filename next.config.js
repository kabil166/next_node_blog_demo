/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { appDir: true, serverComponentsExternalPackages: ["mongoose"] },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api' // production api
},
}

module.exports = nextConfig
