/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RECAPTCHA_SITE_KEY: "6Le1WecZAAAAAJHHNtF0A1yOx642M8M0Us5HoJn7",
    ALLOWED_PARTY_SECRET: "ALL",
  },
};

module.exports = nextConfig;
