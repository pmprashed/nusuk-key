/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    // Confirmed Nusuk service deep link template (e.g., https://services.nusuk.sa/app?p=27&id=NG-CXEVbXwR)
    // Set NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE in Vercel env vars to override.
    NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE:
      process.env.NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE ||
      "https://services.nusuk.sa/app?p=27&id={code}",
  },
};

export default nextConfig;
