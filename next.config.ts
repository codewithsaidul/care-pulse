import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
    env: {
      NEXT_PUBLIC_ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
      NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },
};

export default nextConfig;
