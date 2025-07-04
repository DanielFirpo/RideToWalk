import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_IS_STAGING) {
    console.warn(
      "Warning! NEXT_PUBLIC_IS_STAGING=true, which means the site will deny any google crawling bots. Continuing with this robots.txt config:",
      JSON.stringify({
        rules: {
          userAgent: "*",
          ...(process.env.NEXT_PUBLIC_IS_STAGING ? { disallow: "/" } : { allow: "/" }),
        },
        sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
      }),
    );
  }

  return {
    rules: process.env.NEXT_PUBLIC_IS_STAGING
      ? [
        {
          userAgent: "*",
          disallow: "/",
        },
      ]
      : [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/cdn-cgi/l/email-protection",
        },
      ],
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
  };
}
