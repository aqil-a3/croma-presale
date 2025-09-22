import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              typescript: true,
              svgo: true,
              svgProps: {
                fill: "currentColor",
                stroke: "currentColor",
              },
              svgoConfig: {
                plugins: [
                  {
                    name: "removeAttrs",
                    params: { attrs: "(data-name|class)" },
                  },
                  { name: "convertColors", params: { currentColor: true } },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
