import type { NextConfig } from "next";
import nextI18nextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: nextI18nextConfig.i18n
};

export default nextConfig;
