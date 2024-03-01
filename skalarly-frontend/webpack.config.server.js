const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.server.ts', // Adjust if your entry file is different
  target: 'node', // Optimized for Node.js
  mode: 'production', // Use 'development' for source maps and easier debugging
  output: {
    path: path.resolve(__dirname, 'dist/skalarly-frontend/server'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // You might have different loaders here since you're not sending these directly to a browser
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [webpackNodeExternals()], // Ignore node_modules when bundling in Node.js
  plugins: [
    // Add plugins that make sense for a server-side context
  ],
};
