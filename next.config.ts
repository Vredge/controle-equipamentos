import type { NextConfig } from "next";

const cabecalhosSeguranca = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "string-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: "standalone", // Gera pasta enxuta para a imagem Docker
  poweredByHeader: false, // Esconde que o site utiliza Next.js
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async headers() {
    return [{source: "/:path*", headers: cabecalhosSeguranca}];
  },
};

export default nextConfig;
