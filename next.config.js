const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  cssModules: true,
  images: {
    domains: ['cdn.sanity.io', 'img.youtube.com'],
  },
});
