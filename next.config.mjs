/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["files.moontv.uz", "https://sea-turtle-app-c2icp.ondigitalocean.app"]
    },
    reactStrictMode: false,
    async generateSitemap() {
        return {
            paths: ["/sitemap.xml"],
            generateSitemap: import("./sitemap.ts").default,
        };
    },
};

export default nextConfig;