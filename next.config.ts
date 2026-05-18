import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/Personal-Web" : undefined,
  assetPrefix: isGitHubPages ? "/Personal-Web" : undefined,
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
