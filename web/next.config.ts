import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Repo root has its own package-lock (Vercel shim); keep Turbopack rooted in `web/`.
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
