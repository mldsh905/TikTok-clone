/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },

  reactStrictMode: true,
  images:{
    domains:['i.guim.co.uk','lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
