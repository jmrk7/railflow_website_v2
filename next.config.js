const { withSentryConfig } = require('@sentry/nextjs');

const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  sentry: {
    hideSourceMaps: true,
    autoInstrumentServerFunctions: false
  },
  env: {
    
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: 'https://railflow.atlassian.net/servicedesk/customer/portal/1',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: 'https://docs.railflow.io/docs/legal/privacy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: 'https://docs.railflow.io/docs/legal/terms',
        permanent: true,
      },
      
    ]
  },
};


/**
 * Sentry webpack plugin options.
 */

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
