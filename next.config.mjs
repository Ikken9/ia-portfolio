/** @type {import('next').NextConfig} */

// Use GitHub Actions environment or NODE_ENV
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isProd = process.env.NODE_ENV === 'production' || isGitHubActions;

// Extract repo name from GITHUB_REPOSITORY (format: "owner/repo-name")
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'ia-portfolio';

const nextConfig = {
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '/',
    output: "export",
    trailingSlash: true,
    transpilePackages: ['next-mdx-remote'],
    images: {
        unoptimized: true
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '', // Make basePath available to client-side
    },
    webpack: (config) => {
        config.module.rules.push(
            { test: /\.md$/, use: "raw-loader" },
            {
                test: /\.mdx$/,
                use: [
                    {
                        loader: "@mdx-js/loader",
                        options: { providerImportSource: "@mdx-js/react" },
                    },
                ],
            }
        );
        return config;
    }
};

export default nextConfig;
