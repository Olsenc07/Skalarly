import path from 'path';
import { fileURLToPath } from 'url';

// Convert the file URL to a directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const target = 'web';
export const mode = 'none';
export const entry = { browser: './src/main.ts' };
export const output = {
  path: join(__dirname, 'dist'),
  filename: '[name].js'
};
export const module = {
  rules: [
    // Add loaders for CSS, images, fonts, etc.
  ],
};
export const plugins = [
  // Add any browser-specific webpack plugins here
];
export const resolve = {
  extensions: ['.ts', '.js'], // Add other extensions if needed
};
export const optimization = {
  splitChunks: {
    chunks: 'all',
    // Other code splitting
  }
};