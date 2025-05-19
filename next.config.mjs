/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.pravatar.cc'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['@reduxjs/toolkit', 'react-redux'],
    },
};

export default nextConfig; 