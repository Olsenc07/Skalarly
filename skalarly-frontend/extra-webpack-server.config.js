import path from 'path';
import { fileURLToPath } from 'url';

// Convert the file URL to a directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const experiments = {
  outputModule: true,
};
export const target = 'node';
export const mode = 'none';
export const entry = { server: './server.ts' };
export const output = {
  path: join(__dirname, 'dist'),
  filename: '[name].js',
  library: {
    type: 'module',
  },
};
export const module = {
  rules: [
    // Your module rules here
  ],
};
export const plugins = [
  // Your server-specific plugins here
];
export const resolve = {
  extensions: ['.ts', '.js'],
  fullySpecified: false, // Disable the requirement for the extension
};
export const optimization = {
  // Your optimization options here
};
