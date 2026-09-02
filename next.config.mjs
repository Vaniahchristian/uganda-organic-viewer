/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build/server run alongside `npm run dev` without the two
  // fighting over the same .next directory: NEXT_DIST_DIR=.next-verify npm run build
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
