/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //env
  env: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
  }
}

module.exports = nextConfig
