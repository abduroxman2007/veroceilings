import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: ["src_legacy/**", ".next/**", "build/**", "public/**"],
  },
];

export default config;
