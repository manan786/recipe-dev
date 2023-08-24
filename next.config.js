/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['localhost','recipe-bk-v1-1-1.vercel.app','res.cloudinary.com'] // <== Domain name
  }
}

module.exports = nextConfig
