import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Links shared before the site offered two résumés still resolve.
  async redirects() {
    return [{ source: "/resume.pdf", destination: "/resume/meet-mehta-full-stack.pdf", permanent: false }];
  },
};

export default nextConfig;
