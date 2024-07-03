/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.api-sports.io", // Add the domain you need to configure for images
      "mcdonalds.yourlile.tech", // Additional domain already configured
      "app.123fblive.com", // Additional domain already configured
    ], // Correct domain name
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
