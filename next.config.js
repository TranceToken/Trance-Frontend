/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
/*       {
        source: "/dashboard",
        destination: "/dashboard",
        permanent: false,
      }, */
      {
        source: "/",
        destination: "/mint/1",
        permanent: false,
      },
      {
        source: "/stake",
        destination: "/stake/1",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
