/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow cross-origin requests from local network IPs
  allowedDevOrigins: [
    '192.168.0.156', // Your specific IP
    '192.168.0.*',   // Allow all IPs in the 192.168.0.x range
    '192.168.*.*',   // Allow all local network IPs
    'localhost',
    '127.0.0.1',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to backend
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*', // Proxy uploads to backend
      },
    ]
  },
}

export default nextConfig
