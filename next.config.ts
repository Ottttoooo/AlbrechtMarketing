import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev) {
      // Enable reCAPTCHA on localhost
      config.resolve.alias['react-google-recaptcha'] = require.resolve('react-google-recaptcha');
    }
    return config;
  }
};

export default nextConfig;
