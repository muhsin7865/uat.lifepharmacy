/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [767, 1440],
    domains: [
      "life-cdn.lifepharmacy.com",
      "lifeadmin-app.s3.me-south-1.amazonaws.com",
      "www.lifepharmacy.com",
      "lifemedicalcentre.com",
    ],
  },
  i18n: {
    locales: ["ae-en", "ae-ar", "sa-en", "sa-ar"],
    defaultLocale: "ae-en",
    localeDetection: false,
  }
};

module.exports = nextConfig;