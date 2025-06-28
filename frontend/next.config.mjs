import path from "path";

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
    webpack(config) {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@": path.resolve(process.cwd()),
            "@components": path.resolve(process.cwd(), "src/app/_components"),
            "@contentTypes": path.resolve(process.cwd(), "../backend/src/api"),
            "@strapiTypes": path.resolve(process.cwd(), "../backend/src/common"),
            "@pageSectionTypes": path.resolve(
                process.cwd(),
                "../backend/src/components/page-section-contents/interfaces"
            ),
        };
        return config;
    },
};

console.warn("next image domain", {
    protocol: 'https',
    hostname: process.env.ALLOWED_IMAGE_DOMAIN,
    port: ''
});

export default nextConfig;
