/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  serverRuntimeConfig: {
    // Max body size limit in bytes (e.g., 10MB)
    maxBodySize: 10 * 1024 * 1024,
  },
};

module.exports = nextConfig
