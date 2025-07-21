import path from "path";

import 'dotenv/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/redirects", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.STRAPI_TOKEN ? process.env.STRAPI_TOKEN : process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        });
        const data = (await response.json()).data;

        return data.map((redirect) => ({
            source: `${redirect.attributes.from}`,
            destination: `${redirect.attributes.to}`,
            permanent: redirect.attributes.isPermanent,
        }));
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
            {
                source: "/ingest/decide",
                destination: "https://us.i.posthog.com/decide",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
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