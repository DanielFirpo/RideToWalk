/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337'
            },
            {
                protocol: 'https',
                hostname: process.env.ALLOWED_IMAGE_DOMAIN,
                port: ''
            }
        ],
    },
};

console.warn("next image domain", {
    protocol: 'https',
    hostname: process.env.ALLOWED_IMAGE_DOMAIN,
    port: ''
});

export default nextConfig;
