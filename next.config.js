/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // future: {
  //   webpack5: true,
  // },
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.mdx/,
  //     use: [
  //       options.defaultLoaders.babel,
  //       {
  //         loader: '@mdx-js/loader',
  //         options: pluginOptions.options,
  //       },
  //     ],
  //   })

  //   return config;
  // },
  
}

module.exports = nextConfig
