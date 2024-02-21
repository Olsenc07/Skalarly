const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      // You can customize the options here
      // For example, to open the report automatically:
      openAnalyzer: true,
    }),
  ],
};
