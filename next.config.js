// write webpack config to debug/analyze it
const fs = require('node:fs');
const createNextIntlPlugin = require('next-intl/plugin');
const createMDX = require('@next/mdx');

function writeToFile(obj, fileName) {
  try {
    fs.writeFileSync(`.debug/${fileName}`, JSON.stringify(obj));
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

// add this to be able to serialize the webpack config and options
BigInt.prototype['toJSON'] = function () { 
  return this.toString();
}

/* 
Add this to nextConfig to debug WebPack:

webpack: function (config, options) {
  writeToFile(config, 'webpack-config.json');
  writeToFile(options, 'webpack-options.json');
  return config;
},

*/

// @type { import('next').NextConfig }
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
const withNextIntl = createNextIntlPlugin();

module.exports = withMDX(
  withNextIntl(nextConfig)
);
