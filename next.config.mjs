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
        webpackBuildWorker: true,
        turbotrace: {
            logLevel: 'error',
            logDetail: true,
        },
    },
    webpack: (config, { dev }) => {
        if (!dev) {
            config.optimization = {
                ...config.optimization,
                moduleIds: 'deterministic',
                splitChunks: {
                    chunks: 'all',
                    minSize: 20000,
                    maxSize: 244000,
                    minChunks: 1,
                    maxAsyncRequests: 30,
                    maxInitialRequests: 30,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
            };
        }
        return config;
    },
};

export default nextConfig; 